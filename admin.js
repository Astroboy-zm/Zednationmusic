import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";
import { firebaseConfig } from "./firebase-config.js";

const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app), storage=getStorage(app);
const $=id=>document.getElementById(id);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
function showDash(user){$("loginBox").classList.add("hidden");$("dashboard").classList.remove("hidden");loadAdminSongs()}
function showLogin(){$("loginBox").classList.remove("hidden");$("dashboard").classList.add("hidden")}
$("login").onclick=async()=>{ $("loginStatus").textContent="Logging in..."; try{await signInWithEmailAndPassword(auth,$("email").value,$("password").value)}catch(e){$("loginStatus").textContent="Login failed. Check your account and Firebase setup."}};
$("logout").onclick=()=>signOut(auth);
onAuthStateChanged(auth,u=>u?showDash(u):showLogin());

$("uploadForm").addEventListener("submit",async e=>{
 e.preventDefault(); const file=$("audio").files[0]; if(!file)return;
 $("uploadStatus").textContent="Uploading...";
 try{
  const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,"_");
  const path=`music/${crypto.randomUUID()}-${safe}`;
  const storageRef=ref(storage,path);
  await uploadBytes(storageRef,file,{contentType:file.type});
  const audioUrl=await getDownloadURL(storageRef);
  await addDoc(collection(db,"songs"),{title:$("title").value.trim(),artist:$("artist").value.trim(),audioUrl,coverUrl:$("cover").value.trim(),storagePath:path,createdAt:serverTimestamp()});
  e.target.reset(); $("artist").value="ASTROBOY ZM"; $("uploadStatus").textContent="Song uploaded successfully."; loadAdminSongs();
 }catch(err){console.error(err);$("uploadStatus").textContent="Upload failed. Make sure your account is an authorized admin and Storage/Firestore rules are installed."}
});
async function loadAdminSongs(){
 try{const snap=await getDocs(query(collection(db,"songs"),orderBy("createdAt","desc")));$("adminSongs").innerHTML=snap.docs.map(d=>{const s=d.data();return `<div class="admin-song"><b>${esc(s.title)}</b><span>${esc(s.artist)}</span></div>`}).join("")||"<p class='meta'>No songs yet.</p>"}catch(e){console.error(e)}
}
