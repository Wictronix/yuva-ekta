// ─────────────────────────────────────────────────────────────────────────────
// This page has been commented out.
// The primary post-payment thank you page is at /donate/thank-you
// ─────────────────────────────────────────────────────────────────────────────

import { redirect } from "next/navigation";

// Next.js requires a default export — redirect to the primary thank you page.
export default function ThankYouPage() {
  redirect("/donate/thank-you");
}

// import { constructMetadata } from "@/lib/seo";
// import { CheckCircle2, ArrowRight, Share2, Mail } from "lucide-react";
// import Link from "next/link";

// export const metadata = constructMetadata({
//     title: 'Thank You',
//     description: 'We are deeply grateful for your support. Your donation will make a real difference in Gurugram.',
//     noIndex: true,
// });

// export default function ThankYouPage() {
//     return (
//         <main className="min-h-screen bg-brand-offwhite/30 flex items-center justify-center py-24 px-6">
//             <div className="max-w-3xl w-full bg-white rounded-[4rem] p-12 md:p-24 text-center shadow-2xl border border-brand-brown/5 space-y-12">
//                 <div className="space-y-6">
//                     <div className="w-24 h-24 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-brand-green/20">
//                         <CheckCircle2 size={48} />
//                     </div>
//                     <div className="space-y-4">
//                         <h1 className="text-4xl md:text-6xl font-black text-brand-brown font-playfair">Thank You!</h1>
//                         <p className="text-xl text-brand-brown/60 font-inter font-light max-w-lg mx-auto">
//                             Your generosity is fuel for our mission. Because of you, a child in Sohna will have a better tomorrow.
//                         </p>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
//                     <div className="p-8 bg-brand-offwhite/80 rounded-3xl space-y-4">
//                         <div className="flex items-center gap-3 text-brand-pink font-bold text-[10px] uppercase tracking-widest">
//                             <Mail size={16} />
//                             <span>Next Steps</span>
//                         </div>
//                         <p className="text-sm text-brand-brown/70 leading-relaxed font-inter">
//                             You will receive a payment confirmation from Razorpay immediately. Our team will email your 80G Tax Receipt within 7 working days.
//                         </p>
//                     </div>
//                     <div className="p-8 bg-brand-offwhite/80 rounded-3xl space-y-4">
//                         <div className="flex items-center gap-3 text-brand-pink font-bold text-[10px] uppercase tracking-widest">
//                             <Share2 size={16} />
//                             <span>Spread the Word</span>
//                         </div>
//                         <p className="text-sm text-brand-brown/70 leading-relaxed font-inter">
//                             Tell your friends about the impact you're making! Join us in bringing change to rural Gurugram.
//                         </p>
//                     </div>
//                 </div>

//                 <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
//                     <Link
//                         href="/projects"
//                         className="bg-brand-brown text-white font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-brown/90 hover:scale-[1.02] active:scale-95 transition-all"
//                     >
//                         <span>Explore Our Projects</span>
//                         <ArrowRight size={18} />
//                     </Link>
//                     <Link
//                         href="/"
//                         className="bg-brand-offwhite text-brand-brown font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-brown/5 transition-all"
//                     >
//                         Return Home
//                     </Link>
//                 </div>
//             </div>
//         </main>
//     );
// }
