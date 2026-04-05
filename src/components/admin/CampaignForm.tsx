"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCampaignAction, updateCampaignAction } from "@/app/actions/campaigns";
import { CampaignInsert, CampaignUpdate } from "@/lib/supabase/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CampaignFormProps {
  initialData?: any;
}

export default function CampaignForm({ initialData }: CampaignFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<CampaignInsert>>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "education",
    status: initialData?.status || "active",
    short_desc: initialData?.short_desc || "",
    long_desc: initialData?.long_desc || "",
    cover_image_url: initialData?.cover_image_url || "",
    is_featured: initialData?.is_featured || false,
    campaign_goal: initialData?.campaign_goal || 0,
    target_people: initialData?.target_people || 0,
    funding_breakdown: initialData?.funding_breakdown || [],
    products: initialData?.products || [],
    updates: initialData?.updates || [],
  });

  const handleChange = (field: keyof CampaignInsert, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    handleChange("title", title);
    if (!isEditing) {
      handleChange("slug", title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  // --- Dynamic Array Handlers ---
  const addFundingRow = () => {
    setFormData(prev => ({
      ...prev,
      funding_breakdown: [...(prev.funding_breakdown as any[] || []), { label: "", amount: 0, percentage: 0 }]
    }));
  };

  const updateFundingRow = (index: number, field: string, value: any) => {
    const newArr = [...(formData.funding_breakdown as any[])];
    newArr[index] = { ...newArr[index], [field]: value };
    setFormData(prev => ({ ...prev, funding_breakdown: newArr }));
  };

  const removeFundingRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      funding_breakdown: (prev.funding_breakdown as any[]).filter((_, i) => i !== index)
    }));
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...(prev.products as any[] || []), { name: "", impact: "", price: 0, image_url: "" }]
    }));
  };

  const updateProduct = (index: number, field: string, value: any) => {
    const newArr = [...(formData.products as any[])];
    newArr[index] = { ...newArr[index], [field]: value };
    setFormData(prev => ({ ...prev, products: newArr }));
  };

  const removeProduct = (index: number) => {
    setFormData(prev => ({
      ...prev,
      products: (prev.products as any[]).filter((_, i) => i !== index)
    }));
  };

  const addUpdate = () => {
    setFormData(prev => ({
      ...prev,
      updates: [...(prev.updates as any[] || []), { date: new Date().toISOString().split("T")[0], title: "", body: "", image_url: "" }]
    }));
  };

  const updateUpdateRow = (index: number, field: string, value: any) => {
    const newArr = [...(formData.updates as any[])];
    newArr[index] = { ...newArr[index], [field]: value };
    setFormData(prev => ({ ...prev, updates: newArr }));
  };

  const removeUpdateRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      updates: (prev.updates as any[]).filter((_, i) => i !== index)
    }));
  };

  // --- Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isEditing) {
        const res = await updateCampaignAction(initialData.id, formData);
        if (res.error) throw new Error(res.error);
        toast.success("Campaign updated successfully");
      } else {
        const res = await createCampaignAction(formData);
        if (res.error) throw new Error(res.error);
        toast.success("Campaign created successfully");
        router.push("/admin/campaigns");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/campaigns">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-brand-brown/60">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black font-playfair text-brand-brown tracking-tight">
              {isEditing ? "Edit Campaign" : "New Campaign"}
            </h1>
            <p className="text-brand-brown/60 font-medium">Fill in the details for this campaign.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/campaigns">
            <Button type="button" variant="outline" className="border-brand-brown/10 text-brand-brown">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting} className="bg-brand-pink text-white hover:bg-brand-pink/90">
            {isSubmitting ? "Saving..." : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Campaign
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brand-brown/10 overflow-hidden shadow-sm p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8 bg-brand-brown/5 text-brand-brown/60">
            <TabsTrigger value="basic" className="font-bold data-[state=active]:bg-white data-[state=active]:text-brand-pink data-[state=active]:shadow-sm">Basic Info</TabsTrigger>
            <TabsTrigger value="financials" className="font-bold data-[state=active]:bg-white data-[state=active]:text-brand-pink data-[state=active]:shadow-sm">Financials</TabsTrigger>
            <TabsTrigger value="content" className="font-bold data-[state=active]:bg-white data-[state=active]:text-brand-pink data-[state=active]:shadow-sm">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown">Title *</label>
                <Input required value={formData.title} onChange={handleTitleChange} className="border-brand-brown/20 focus-visible:ring-brand-pink" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown">Slug *</label>
                <Input required value={formData.slug} onChange={(e) => handleChange("slug", e.target.value)} className="border-brand-brown/20 focus-visible:ring-brand-pink" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown">Category</label>
                <Select value={formData.category as string} onValueChange={(val) => handleChange("category", val)}>
                  <SelectTrigger className="border-brand-brown/20 focus:ring-brand-pink">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="livelihood">Livelihood</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown">Status</label>
                <Select value={formData.status as string} onValueChange={(val) => handleChange("status", val)}>
                  <SelectTrigger className="border-brand-brown/20 focus:ring-brand-pink">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-brown">Short Description *</label>
              <Input required value={formData.short_desc} onChange={(e) => handleChange("short_desc", e.target.value)} maxLength={160} placeholder="Brief description for cards (max 160 chars)" className="border-brand-brown/20 focus-visible:ring-brand-pink" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-brown">Cover Image URL</label>
              <Input value={formData.cover_image_url || ""} onChange={(e) => handleChange("cover_image_url", e.target.value)} placeholder="https://" className="border-brand-brown/20 focus-visible:ring-brand-pink" />
              {formData.cover_image_url && (
                <div className="mt-2 w-48 h-28 rounded-lg overflow-hidden border border-brand-brown/10">
                  <img src={formData.cover_image_url} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-4 border-t border-brand-brown/10">
              <Checkbox 
                id="is_featured" 
                checked={formData.is_featured as boolean} 
                onCheckedChange={(checked) => handleChange("is_featured", !!checked)}
                className="data-[state=checked]:bg-brand-pink data-[state=checked]:border-brand-pink" 
              />
              <label htmlFor="is_featured" className="text-sm font-bold text-brand-brown leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Is Featured (Show on homepage)
              </label>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown">Campaign Goal (₹) *</label>
                <Input type="number" required value={formData.campaign_goal || 0} onChange={(e) => handleChange("campaign_goal", Number(e.target.value))} className="border-brand-brown/20 focus-visible:ring-brand-pink" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-brown">Target People (Count)</label>
                <Input type="number" value={formData.target_people || 0} onChange={(e) => handleChange("target_people", Number(e.target.value))} className="border-brand-brown/20 focus-visible:ring-brand-pink" />
              </div>
            </div>

            <div className="border-t border-brand-brown/10 pt-6 space-y-4">
              <h3 className="text-lg font-bold font-playfair text-brand-brown">Funding Breakdown</h3>
              
              <div className="space-y-3">
                {(formData.funding_breakdown as any[] || []).map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-brand-brown/5 p-3 rounded-lg border border-brand-brown/10">
                    <div className="flex-1 space-y-1">
                      <label className="text-xs font-bold text-brand-brown/60">Label</label>
                      <Input value={item.label} onChange={(e) => updateFundingRow(index, "label", e.target.value)} placeholder="e.g. Educator Salaries" className="bg-white border-none h-8" />
                    </div>
                    <div className="w-32 space-y-1">
                      <label className="text-xs font-bold text-brand-brown/60">Amount (₹)</label>
                      <Input type="number" value={item.amount} onChange={(e) => updateFundingRow(index, "amount", Number(e.target.value))} className="bg-white border-none h-8" />
                    </div>
                    <div className="w-24 space-y-1">
                      <label className="text-xs font-bold text-brand-brown/60">Percent (%)</label>
                      <Input type="number" value={item.percentage} onChange={(e) => updateFundingRow(index, "percentage", Number(e.target.value))} className="bg-white border-none h-8" />
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeFundingRow(index)} className="mt-5 text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={addFundingRow} className="border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5 text-xs font-bold">
                <Plus className="w-3 h-3 mr-1.5" /> Add Funding Row
              </Button>
            </div>
            
            <div className="border-t border-brand-brown/10 pt-6 space-y-4">
              <h3 className="text-lg font-bold font-playfair text-brand-brown">Products to Donate</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                {(formData.products as any[] || []).map((item, index) => (
                  <div key={index} className="space-y-3 bg-brand-brown/5 p-4 rounded-xl border border-brand-brown/10 relative">
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeProduct(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 h-6 w-6">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                    <div className="space-y-1 pr-8">
                      <label className="text-xs font-bold text-brand-brown/60">Product Name</label>
                      <Input value={item.name} onChange={(e) => updateProduct(index, "name", e.target.value)} placeholder="e.g. School Kit" className="bg-white border-none h-8" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-brown/60">Impact Statement</label>
                      <Input value={item.impact} onChange={(e) => updateProduct(index, "impact", e.target.value)} placeholder="e.g. Equips 1 child for a semester" className="bg-white border-none h-8" />
                    </div>
                    <div className="flex gap-3">
                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-bold text-brand-brown/60">Price (₹)</label>
                        <Input type="number" value={item.price} onChange={(e) => updateProduct(index, "price", Number(e.target.value))} className="bg-white border-none h-8" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-bold text-brand-brown/60">Image URL (opt)</label>
                        <Input value={item.image_url || ""} onChange={(e) => updateProduct(index, "image_url", e.target.value)} placeholder="https://" className="bg-white border-none h-8" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={addProduct} className="border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5 text-xs font-bold">
                <Plus className="w-3 h-3 mr-1.5" /> Add Product
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-brown">Long Description (Markdown Support) *</label>
              <Textarea 
                required 
                value={formData.long_desc} 
                onChange={(e) => handleChange("long_desc", e.target.value)} 
                className="min-h-[300px] border-brand-brown/20 focus-visible:ring-brand-pink bg-white font-mono text-sm" 
                placeholder="# Problem Statement&#10;&#10;Use markdown to structure the campaign story..."
              />
            </div>
            <div className="border-t border-brand-brown/10 pt-6 space-y-4">
              <h3 className="text-lg font-bold font-playfair text-brand-brown">Impact Updates</h3>
              <div className="space-y-4">
                {(formData.updates as any[] || []).map((item, index) => (
                  <div key={index} className="space-y-3 bg-brand-brown/5 p-4 rounded-xl border border-brand-brown/10 relative">
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeUpdateRow(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 h-6 w-6">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                    <div className="grid grid-cols-2 gap-4 pr-8">
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-brand-brown/60">Date</label>
                          <Input type="date" value={item.date} onChange={(e) => updateUpdateRow(index, "date", e.target.value)} className="bg-white border-none h-8" />
                       </div>
                       <div className="space-y-1">
                          <label className="text-xs font-bold text-brand-brown/60">Image URL</label>
                          <Input value={item.image_url || ""} onChange={(e) => updateUpdateRow(index, "image_url", e.target.value)} placeholder="https://" className="bg-white border-none h-8" />
                       </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-brown/60">Title</label>
                      <Input value={item.title} onChange={(e) => updateUpdateRow(index, "title", e.target.value)} placeholder="e.g. 50 children completed..." className="bg-white border-none h-8" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-brand-brown/60">Body (Markdown Support)</label>
                      <Textarea value={item.body} onChange={(e) => updateUpdateRow(index, "body", e.target.value)} placeholder="Full update story..." className="bg-white border-none min-h-[100px] text-sm" />
                    </div>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={addUpdate} className="border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5 text-xs font-bold">
                <Plus className="w-3 h-3 mr-1.5" /> Add Update Entry
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </form>
  );
}
