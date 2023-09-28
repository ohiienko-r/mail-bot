(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const a={SEND_EMAIL:"/api/email",STOP_MAILING:"/api/email/stop"},o=r=>fetch(a.SEND_EMAIL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then(t=>t.json()),m=r=>fetch(a.STOP_MAILING,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then(t=>t.json());class c{constructor(){this.elements={self:document.createElement("section"),form:document.createElement("form"),senderEmail:document.createElement("input"),receiverEmails:document.createElement("input"),mailSubject:document.createElement("input"),mailBody:document.createElement("textarea"),intervalInput:document.createElement("input"),sendBtn:document.createElement("button"),autoSentLettersField:document.createElement("fieldset"),stopBtn:document.createElement("button")}}render(t){this.elements.senderEmail.setAttribute("type","email"),this.elements.senderEmail.setAttribute("name","sender-mail"),this.elements.senderEmail.setAttribute("placeholder","Sender e-mail"),this.elements.receiverEmails.setAttribute("name","receiver-emails"),this.elements.receiverEmails.setAttribute("required",""),this.elements.receiverEmails.setAttribute("placeholder","Recipients e-mails"),this.elements.mailSubject.setAttribute("name","mail-subject"),this.elements.mailSubject.setAttribute("placeholder","E-mail subject"),this.elements.mailBody.setAttribute("name","mail-body"),this.elements.mailBody.setAttribute("placeholder","Type your message here..."),this.elements.intervalInput.setAttribute("type","number"),this.elements.intervalInput.setAttribute("max","24"),this.elements.intervalInput.setAttribute("name","mail-interval"),this.elements.intervalInput.setAttribute("placeholder","How frequently do you want msg to be sent in hours (must be less than 24)"),this.elements.sendBtn.innerText="Send",this.elements.sendBtn.disabled=!0,this.elements.sendBtn.addEventListener("click",e=>{e.preventDefault(),this.sendHandler(),this.elements.form.reset(),this.elements.sendBtn.disabled=!0});const n=JSON.parse(localStorage.getItem("autoLeters"));this.displayAutoSentEmails(n),this.elements.stopBtn.innerText="Stop auto emailing",this.elements.stopBtn.addEventListener("click",e=>{e.preventDefault(),this.stopHandler()}),this.elements.form.addEventListener("change",e=>{this.inputsChecker()}),this.elements.form.append(this.elements.senderEmail,this.elements.receiverEmails,this.elements.mailSubject,this.elements.mailBody,this.elements.intervalInput,this.elements.sendBtn,this.elements.autoSentLettersField,this.elements.stopBtn),this.elements.self.classList.add("form-container"),this.elements.self.append(this.elements.form),t.append(this.elements.self)}inputsChecker(){!this.elements.receiverEmails.value||!this.elements.intervalInput.value||this.elements.intervalInput.value>24?this.elements.sendBtn.disabled=!0:this.elements.sendBtn.disabled=!1}displayAutoSentEmails(t){if(this.elements.autoSentLettersField.replaceChildren(),!t)return null;t.forEach(n=>{const e=document.createElement("label");e.innerText=n.subject;const s=document.createElement("input");s.setAttribute("type","checkbox"),s.setAttribute("id",`${n.id}`),e.prepend(s),this.elements.autoSentLettersField.append(e)})}async sendHandler(){const t=new FormData(this.elements.form),n={receiverEmails:[t.get("receiver-emails"),t.get("sender-mail")],mailSubject:t.get("mail-subject"),mailBody:t.get("mail-body"),mailInterval:+t.get("mail-interval")*36e5};try{const e=await o(n);localStorage.setItem("autoLeters",JSON.stringify(e)),this.displayAutoSentEmails(e)}catch(e){throw new Error(e)}}async stopHandler(){const t=this.elements.autoSentLettersField.querySelectorAll('input[type="checkbox"]'),n={ids:[]};t.forEach(e=>{e.checked===!0&&n.ids.push(+e.id)});try{const e=await m(n);localStorage.setItem("autoLeters",JSON.stringify(e)),this.displayAutoSentEmails(e)}catch(e){throw new Error(e)}}}const d=document.querySelector("#app"),u=new c;u.render(d);
