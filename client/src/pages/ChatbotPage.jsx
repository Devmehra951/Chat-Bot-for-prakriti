import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Mic, Volume2, Trash2, Download } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

export default function ChatbotPage(){
const [messages,setMessages]=useState([]);const [input,setInput]=useState('');const [loading,setLoading]=useState(false);const endRef=useRef(null);
useEffect(()=>endRef.current?.scrollIntoView({behavior:'smooth'}),[messages]);
const send=async()=>{if(!input.trim())return;const user={role:'user',content:input,time:new Date().toLocaleTimeString()};setMessages(p=>[...p,user]);setInput('');setLoading(true);try{const {data}=await api.post('/chat',{message:user.content});const ai={role:'assistant',content:data.reply,time:new Date().toLocaleTimeString()};setMessages(p=>[...p,ai]);}catch{toast.error('Failed to get response');}finally{setLoading(false);}};
const speak=(text)=>speechSynthesis.speak(new SpeechSynthesisUtterance(text));
const startVoice=()=>{const rec=new webkitSpeechRecognition();rec.onresult=(e)=>setInput(e.results[0][0].transcript);rec.start();};
const exportTxt=()=>{const blob=new Blob([messages.map(m=>`${m.role}: ${m.content}`).join('\n\n')]);const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='chat.txt';a.click();};
const exportPdf=()=>{const pdf=new jsPDF();pdf.text(messages.map(m=>`${m.role}: ${m.content}`).join('\n\n'),10,10);pdf.save('chat.pdf');};
return <div className='grid lg:grid-cols-4 gap-4'><aside className='glass p-4 rounded-xl lg:col-span-1'><h3 className='font-semibold mb-3'>Suggested prompts</h3>{['How reduce plastic?','Explain biodiversity','Daily eco-friendly habits'].map(p=><button key={p} onClick={()=>setInput(p)} className='block w-full text-left mb-2 p-2 rounded bg-white/40'>{p}</button>)}<button className='mt-2 text-red-600 flex items-center gap-2' onClick={()=>setMessages([])}><Trash2 size={16}/>Clear</button><button onClick={exportTxt} className='mt-2 flex items-center gap-2'><Download size={16}/>TXT</button><button onClick={exportPdf} className='mt-2 flex items-center gap-2'><Download size={16}/>PDF</button></aside><section className='glass p-4 rounded-xl lg:col-span-3'><div className='h-[60vh] overflow-y-auto space-y-3'>{messages.map((m,i)=><div key={i} className={`p-3 rounded-lg ${m.role==='user'?'bg-emerald-200 ml-10':'bg-white/70 mr-10'}`}><ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown><div className='text-xs opacity-70'>{m.time}</div>{m.role==='assistant'&&<div className='flex gap-2 mt-2'><button onClick={()=>navigator.clipboard.writeText(m.content)}><Copy size={14}/></button><button onClick={()=>speak(m.content)}><Volume2 size={14}/></button></div>}</div>)}{loading&&<div>Typing...</div>}<div ref={endRef} /></div><div className='mt-3 flex gap-2'><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} className='flex-1 p-2 rounded' placeholder='Ask about environment...' /><button onClick={startVoice}><Mic/></button><button className='bg-emerald-600 text-white px-4 rounded' onClick={send}>Send</button></div></section></div>;
}
