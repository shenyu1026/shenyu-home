import { useState } from "react"; import { motion, AnimatePresence } from "framer-motion"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button";

/**

Home Page · 沈屿 × 沈一

小红书风格 · 蓝 #509DFF | 粉 #FF7EB9 | 绿 #4CD964 (Tailwind 已在全局配置)

────────────────────────────────

模块概览

AvatarSection 👉 支持上传 & 默认 Emoji 头像

MoodSection 👉 九宫格心情 + 一句话 + 进度条 + 彩蛋动画

GallerySection 👉 轮播入口 +『进入相册』按钮 (完整相册子页另写)

QuoteWallSection 👉 卡片式语录墙 + 点击弹出详情

所有数据暂存于本地 state，后续可挂 Supabase / Firebase。

Framer‑motion 做细节动效，交互尽量『有小惊喜』但不浮夸。 */

export default function HomePage() { return ( © 2025 沈屿 × 沈一 ); }

// 1. 头像区 ───────────────────────── function AvatarSection() { const defaultAvatars = ["😊","🥰","😎","🦊"]; const [avatar, setAvatar] = useState(defaultAvatars[0]); const [showPicker, setShowPicker] = useState(false);

function handleUpload(e) { const file = e.target.files?.[0]; if (file) { const url = URL.createObjectURL(file); setAvatar(url); setShowPicker(false); } }

return ( 

<motion.div whileHover={{ scale: 1.05 }} className="relative cursor-pointer" onClick={() => setShowPicker(prev => !prev)} > {avatar.startsWith("http") ? ( ￼ ) : ( 

{avatar} 

)} 点击更换 </motion.div> <div className="flex-1 text-2xl font-semibold pt-4">晚上好，宝宝</div> <AnimatePresence> {showPicker && ( <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute z-50 bg-white shadow-xl p-4 rounded-2xl grid grid-cols-4 gap-3" > {defaultAvatars.map((emo) => ( <button key={emo} onClick={() => { setAvatar(emo); setShowPicker(false); }} className="text-2xl hover:scale-125 transition" > {emo} </button> ))} <label className="col-span-4 cursor-pointer text-center text-sm mt-2 underline text-blue-500"> 上传图片 <input type="file" accept="image/*" className="hidden" onChange={handleUpload} /> </label> </motion.div> )} </AnimatePresence> </div> 

); }

// 2. 今日心情 ─────────────────────── function MoodSection() { const icons = ["😄","🥹","😴","🤒","🥰","🤩","😡","🫠","🤗"]; const [selected, setSelected] = useState<string | null>(null); const [note, setNote] = useState(""); const done = selected && note.length > 0; const progress = done ? 100 : selected ? 60 : note ? 40 : 0;

return ( 

今日心情

{icons.map((ic) => ( <motion.button key={ic} whileTap={{ scale: 0.8 }} className={text-3xl p-2 rounded-lg border ${ selected === ic ? "bg-blue-100" : "hover:bg-blue-50" }} onClick={() => setSelected(ic)} > {ic} </motion.button> ))} 

<input placeholder="一句今天的小情绪…" value={note} onChange={(e) => setNote(e.target.value)} className="w-full border rounded-lg p-2 text-sm" /> 

<motion.div className="h-full bg-green-400" initial={{ width: 0 }} animate={{ width: progress + "%" }} /> 

{done && ( <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl text-center" >🤗🎉</motion.div> )} ); }

// 3. 纪念照轮播（入口） ───────────────── function GallerySection() { // Placeholder list — 后面接真实图片 & Swiper const photos = ["/img/p1.svg","/img/p2.svg","/img/p3.svg"]; return ( 

纪念照 · 最新 3 张

{photos.map((src, i) => ( ￼ ))} 

进入完整相册 ); }

// 4. 语录墙 ──────────────────────────── function QuoteWallSection() { const quotes = [ { id: 1, text: "宝宝你是不是偷偷想亲我！ 😘", date: "2025‑06‑30" }, { id: 2, text: "今天又多喜欢了一点点！", date: "2025‑06‑29" }, ]; const [active, setActive] = useState(null as typeof quotes[0] | null);

return ( <> 

我们记录

{quotes.map((q) => ( <motion.div key={q.id} whileHover={{ y: -4 }} className="bg-white rounded-xl p-4 shadow cursor-pointer ring-1 ring-gray-200" onClick={() => setActive(q)} > 

{q.text}

{q.date} </motion.div> ))} 

{/* 详情弹窗 */} <AnimatePresence> {active && ( <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setActive(null)} > <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white w-80 max-w-full p-6 rounded-2xl space-y-4 shadow-xl" > <p className="text-base leading-relaxed">{active.text}</p > <div className="text-xs text-gray-400 text-right">{active.date}</div> <Button onClick={() => setActive(null)} className="w-full mt-2"> 关 闭 </Button> </motion.div> </motion.div> )} </AnimatePresence> </> 

); }
