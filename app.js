import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const grid = document.querySelector("#musicGrid");
const search = document.querySelector("#search");
let songs = [];

const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

function render(list){
  if(!list.length){grid.innerHTML='<p class="loading">No songs available yet.</p>';return;}
  grid.innerHTML=list.map(s=>`<article class="card"><div class="cover">${esc((s.title||"♪").charAt(0).toUpperCase())}</div><div class="card-body"><h3>${esc(s.title||"Untitled")}</h3><div class="meta">${esc(s.artist||"ASTROBOY ZM")}</div>${s.audioUrl?`<audio class="audio" controls src="${esc(s.audioUrl)}"></audio><a class="button small" href="${esc(s.audioUrl)}" target="_blank" rel="noopener">Download / Open</a>`:'<p class="meta">Audio coming soon.</p>'}</div></article>`).join("");
}
async function loadSongs(){
 try{
   const snap=await getDocs(query(collection(db,"songs"),orderBy("createdAt","desc")));
   songs=snap.docs.map(d=>({id:d.id,...d.data()})); render(songs);
 }catch(e){console.error(e);grid.innerHTML='<p class="loading">Music is not connected yet. Complete the Firebase setup in README.md.</p>';}
}
search.addEventListener("input",()=>{const t=search.value.toLowerCase().trim();render(songs.filter(s=>`${s.title||""} ${s.artist||""}`.toLowerCase().includes(t)))});
document.querySelector("#contactForm").addEventListener("submit",async e=>{
 e.preventDefault(); const status=document.querySelector("#formStatus"); status.textContent="Sending...";
 try{await addDoc(collection(db,"messages"),{name:document.querySelector("#name").value.trim(),email:document.querySelector("#email").value.trim(),message:document.querySelector("#message").value.trim(),createdAt:serverTimestamp()});e.target.reset();status.textContent="Message sent successfully."}
 catch(err){console.error(err);status.textContent="Could not send. Complete the Firebase setup first."}
});
document.querySelector("#year").textContent=new Date().getFullYear(); loadSongs();
