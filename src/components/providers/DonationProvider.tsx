"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from "react";
import DonationModal from "@/components/donation/DonationModal";

interface DonationModalOptions {
  campaignId?: string;
  campaignName?: string;
  defaultAmount?: number;
}

interface CartItem {
  campaignId: string;
  productIndex: number;
  productName: string;
  productPrice: number;
  quantity: number;
}

interface DonationContextType {
  openDonationModal: (options?: DonationModalOptions) => void;
  closeDonationModal: () => void;
  isOpen: boolean;
  // Cart management
  cart: Record<string, CartItem>;
  updateCartQuantity: (campaignId: string, productIndex: number, productDetails: { name: string, price: number }, delta: number) => void;
  getCampaignCartTotal: (campaignId: string) => number;
  getGlobalCartTotal: () => number;
  getTotalItems: () => number;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<DonationModalOptions>({});
  const [cart, setCart] = useState<Record<string, CartItem>>({});

  const getCampaignCartTotal = useCallback((campaignId: string) => {
    return Object.values(cart)
      .filter(item => item.campaignId === campaignId)
      .reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
  }, [cart]);

  const getGlobalCartTotal = useCallback(() => {
    return Object.values(cart)
      .reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
  }, [cart]);

  const getTotalItems = useCallback(() => {
    return Object.values(cart)
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const openDonationModal = useCallback((options?: DonationModalOptions) => {
    // If no direct amount is provided, use the global cart total as a fallback
    const globalTotal = getGlobalCartTotal();
    const finalOptions = {
        ...options,
        defaultAmount: options?.defaultAmount ?? (globalTotal > 0 ? globalTotal : undefined)
    };
    setModalOptions(finalOptions);
    setIsOpen(true);
  }, [getGlobalCartTotal]);

  const closeDonationModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const updateCartQuantity = useCallback((
    campaignId: string, 
    productIndex: number, 
    productDetails: { name: string, price: number },
    delta: number
  ) => {
    const key = `${campaignId}_${productIndex}`;
    setCart(prev => {
      const current = prev[key] || { 
        campaignId, 
        productIndex, 
        productName: productDetails.name, 
        productPrice: productDetails.price, 
        quantity: 0 
      };
      
      const newQuantity = Math.max(0, current.quantity + delta);
      const newCart = { ...prev };
      
      if (newQuantity === 0) {
        delete newCart[key];
      } else {
        newCart[key] = { ...current, quantity: newQuantity };
      }
      
      return newCart;
    });
  }, []);

  const contextValue = useMemo(() => ({
    openDonationModal,
    closeDonationModal,
    isOpen,
    cart,
    updateCartQuantity,
    getCampaignCartTotal,
    getGlobalCartTotal,
    getTotalItems
  }), [
    openDonationModal,
    closeDonationModal,
    isOpen,
    cart,
    updateCartQuantity,
    getCampaignCartTotal,
    getGlobalCartTotal,
    getTotalItems
  ]);

  return (
    <DonationContext.Provider value={contextValue}>
      {children}
      <DonationModal
        isOpen={isOpen}
        onClose={closeDonationModal}
        campaignId={modalOptions.campaignId}
        campaignName={modalOptions.campaignName}
        defaultAmount={modalOptions.defaultAmount}
      />
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
}
