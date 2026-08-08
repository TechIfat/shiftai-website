/* ============================================================
   ShiftAi Discovery Agent: Chat Widget (shared include)
   API_BASE_URL: update to your deployed backend URL after deployment

   Usage — two lines, in this order, near the end of <body>:
     <script>window.SA_CHAT_CONFIG={placeholder:'...',welcome:'...'};</script>
     <script src="chat-widget.js"></script>

   SA_CHAT_CONFIG is optional; omitted fields fall back to the
   ComplyAI-flavoured defaults below. Every page's <style> block must
   already define the brand CSS custom properties this widget reads
   (--bg, --ink, --ink2, --brass, --bg2, --bg3, --border, --border2,
   --border3, --muted, --muted2) — true of every page on this site.
   ============================================================ */
(function(){
  const CONFIG = Object.assign({
    placeholder: "Ask about ComplyAI or our architecture…",
    welcome: "Hello, I'm the ShiftAi Discovery Agent. I can answer questions about ComplyAI, our governance architecture for UK banks, or how an engagement works. What would you like to know?"
  }, window.SA_CHAT_CONFIG || {});

  const CSS = `
/* Chat widget */
#sa-chat-widget{position:fixed;bottom:24px;right:24px;z-index:9999;font-family:'DM Sans','Segoe UI',system-ui,sans-serif}

/* Toggle button */
#sa-chat-toggle{width:56px;height:56px;border-radius:50%;background:var(--ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(45,53,97,0.28);transition:transform 0.2s,background 0.2s;position:relative}
#sa-chat-toggle:hover{background:var(--ink2);transform:scale(1.05)}
#sa-chat-toggle svg{width:24px;height:24px;fill:var(--bg);transition:opacity 0.15s}
#sa-chat-toggle .icon-close{position:absolute;opacity:0}
#sa-chat-widget.open #sa-chat-toggle .icon-open{opacity:0}
#sa-chat-widget.open #sa-chat-toggle .icon-close{opacity:1}

/* Unread badge */
#sa-badge{position:absolute;top:-3px;right:-3px;width:18px;height:18px;background:var(--brass);border-radius:50%;font-size:11px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.2s}
#sa-badge.visible{opacity:1}

/* Chat panel */
#sa-chat-panel{position:absolute;bottom:68px;right:0;width:360px;max-height:520px;background:var(--bg);border:1px solid var(--border2);border-radius:12px;box-shadow:0 16px 48px rgba(45,53,97,0.18);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(12px) scale(0.97);pointer-events:none;transition:opacity 0.22s ease,transform 0.22s ease}
#sa-chat-widget.open #sa-chat-panel{opacity:1;transform:none;pointer-events:all}

/* Panel header */
#sa-chat-header{background:var(--ink);padding:16px 18px;display:flex;align-items:center;gap:12px;flex-shrink:0}
.sa-avatar{width:36px;height:36px;border-radius:50%;background:var(--brass);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#fff}
.sa-header-text{flex:1;min-width:0}
.sa-header-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:var(--bg);line-height:1.2}
.sa-header-status{font-family:'DM Mono',monospace;font-size:10px;color:rgba(244,243,239,0.5);letter-spacing:0.04em;display:flex;align-items:center;gap:5px;margin-top:2px}
.sa-status-dot{width:6px;height:6px;border-radius:50%;background:#5cb85c;flex-shrink:0}

/* Messages */
#sa-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;scroll-behavior:smooth}
#sa-messages::-webkit-scrollbar{width:4px}
#sa-messages::-webkit-scrollbar-track{background:transparent}
#sa-messages::-webkit-scrollbar-thumb{background:var(--border3);border-radius:2px}

.sa-msg{max-width:88%;line-height:1.55;font-size:13.5px;border-radius:10px;padding:10px 13px;word-break:break-word}
.sa-msg.assistant{background:var(--bg3);color:var(--ink);border-bottom-left-radius:3px;align-self:flex-start}
.sa-msg.user{background:var(--ink);color:var(--bg);border-bottom-right-radius:3px;align-self:flex-end}

/* Thinking indicator */
.sa-thinking{display:flex;align-items:center;gap:4px;padding:10px 13px;background:var(--bg3);border-radius:10px;border-bottom-left-radius:3px;align-self:flex-start}
.sa-thinking span{width:6px;height:6px;border-radius:50%;background:var(--muted2);animation:sa-pulse 1.2s ease-in-out infinite}
.sa-thinking span:nth-child(2){animation-delay:0.2s}
.sa-thinking span:nth-child(3){animation-delay:0.4s}
@keyframes sa-pulse{0%,80%,100%{transform:scale(0.7);opacity:0.5}40%{transform:scale(1);opacity:1}}

/* Input area */
#sa-input-area{border-top:1px solid var(--border);padding:12px;display:flex;gap:8px;flex-shrink:0;background:var(--bg)}
#sa-input{flex:1;border:1px solid var(--border2);border-radius:7px;padding:9px 12px;font-size:13.5px;font-family:inherit;color:var(--ink);background:var(--bg2);resize:none;outline:none;transition:border-color 0.15s;line-height:1.4;max-height:100px;overflow-y:auto}
#sa-input:focus{border-color:var(--ink3)}
#sa-input::placeholder{color:var(--muted2)}
#sa-send{width:36px;height:36px;border-radius:7px;background:var(--ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.15s;align-self:flex-end}
#sa-send:hover:not(:disabled){background:var(--ink2)}
#sa-send:disabled{opacity:0.4;cursor:not-allowed}
#sa-send svg{width:16px;height:16px;fill:var(--bg)}

/* Footer */
#sa-chat-footer{padding:6px 12px 8px;text-align:center;border-top:1px solid var(--border)}
#sa-chat-footer span{font-family:'DM Mono',monospace;font-size:9px;color:var(--muted2);letter-spacing:0.05em}

@media(max-width:420px){
  #sa-chat-panel{width:calc(100vw - 32px);right:-8px}
}
/* Markdown in assistant bubbles */
.sa-msg.assistant p{margin:0 0 6px}.sa-msg.assistant p:last-child{margin-bottom:0}
.sa-msg.assistant ul,.sa-msg.assistant ol{margin:4px 0 6px;padding-left:18px}.sa-msg.assistant li{margin-bottom:2px}
.sa-msg.assistant code{font-family:'DM Mono',monospace;font-size:12px;background:rgba(45,53,97,0.08);padding:1px 5px;border-radius:3px}
.sa-msg.assistant pre{background:rgba(45,53,97,0.06);border:1px solid var(--border);border-radius:6px;padding:10px 12px;overflow-x:auto;margin:6px 0}
.sa-msg.assistant pre code{background:none;padding:0;font-size:11.5px}
.sa-msg.assistant a{color:var(--ink2);text-decoration:underline;text-underline-offset:2px}
`;

  const HTML = `
<div id="sa-chat-widget">
  <div id="sa-chat-panel" role="dialog" aria-label="ShiftAi Discovery Agent">
    <div id="sa-chat-header">
      <div class="sa-avatar">S</div>
      <div class="sa-header-text">
        <div class="sa-header-name">ShiftAi Discovery Agent</div>
        <div class="sa-header-status"><span class="sa-status-dot"></span>Ifat Noreen · ShiftAi Systems Ltd</div>
      </div>
    </div>
    <div id="sa-messages" aria-live="polite" aria-atomic="false"></div>
    <div id="sa-input-area">
      <textarea id="sa-input" rows="1" placeholder="${CONFIG.placeholder}" maxlength="1000" aria-label="Chat message"></textarea>
      <button id="sa-send" aria-label="Send message" disabled>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div id="sa-chat-footer"><span>Powered by Anthropic · ShiftAi Systems Ltd</span></div>
  </div>

  <button id="sa-chat-toggle" aria-label="Open chat" aria-expanded="false">
    <svg class="icon-open" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
    <svg class="icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    <span id="sa-badge" aria-hidden="true">1</span>
  </button>
</div>
`;

  function inject(){
    const styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);
    document.body.insertAdjacentHTML('beforeend', HTML);
  }

  function loadMarked(cb){
    if(window.marked){ cb(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/marked@9/marked.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  function setup(){
    marked.use({
      breaks: true,
      renderer: {
        link({ href, text }) {
          const safeHref = href || '';
          const safeText = text || safeHref;
          if (!safeHref) return safeText;
          return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${safeText}</a>`;
        }
      }
    });

    /* Linkify bare URLs in plain text before passing to marked */
    function linkifyText(text) {
      return text.replace(
        /(https?:\/\/[^\s<>"]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      );
    }

    /* ---- Config ---- */
    const API_BASE_URL = "https://shiftaiconsultancy.onrender.com";
    const WELCOME_MSG = CONFIG.welcome;

    /* ---- State ---- */
    const widget   = document.getElementById('sa-chat-widget');
    const panel    = document.getElementById('sa-chat-panel');
    const toggle   = document.getElementById('sa-chat-toggle');
    const messagesEl = document.getElementById('sa-messages');
    const input    = document.getElementById('sa-input');
    const sendBtn  = document.getElementById('sa-send');
    const badge    = document.getElementById('sa-badge');

    let history = [];          // [{role, content}]
    let isOpen  = false;
    let isBusy  = false;
    let welcomed = false;

    /* ---- Toggle ---- */
    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      widget.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      badge.classList.remove('visible');
      if(isOpen && !welcomed){
        welcomed = true;
        appendMsg('assistant', WELCOME_MSG);
      }
      if(isOpen) setTimeout(() => input.focus(), 250);
    });

    /* ---- Auto-resize textarea ---- */
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
      sendBtn.disabled = input.value.trim().length === 0 || isBusy;
    });

    /* ---- Send on Enter (Shift+Enter = newline) ---- */
    input.addEventListener('keydown', e => {
      if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); }
    });

    sendBtn.addEventListener('click', sendMessage);

    /* ---- Append a message bubble ---- */
    function appendMsg(role, text){
      const div = document.createElement('div');
      div.className = 'sa-msg ' + role;
      if(role === 'assistant') div.innerHTML = marked.parse(linkifyText(text));
      else div.textContent = text;
      messagesEl.appendChild(div);
      scrollBottom();
      if(role === 'assistant' && !isOpen){
        badge.classList.add('visible');
      }
      return div;
    }

    /* ---- Thinking indicator ---- */
    function showThinking(){
      const el = document.createElement('div');
      el.className = 'sa-thinking';
      el.id = 'sa-thinking';
      el.innerHTML = '<span></span><span></span><span></span>';
      messagesEl.appendChild(el);
      scrollBottom();
      return el;
    }
    function hideThinking(){
      const el = document.getElementById('sa-thinking');
      if(el) el.remove();
    }

    function scrollBottom(){
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    /* ---- Main send ----- */
    async function sendMessage(){
      const text = input.value.trim();
      if(!text || isBusy) return;

      isBusy = true;
      sendBtn.disabled = true;
      input.value = '';
      input.style.height = 'auto';

      appendMsg('user', text);
      history.push({ role: 'user', content: text });

      const thinking = showThinking();
      let firstToken = true;
      let assistantDiv = null;
      let assistantText = '';
      let resetPending = false;

      try {
        const res = await fetch(API_BASE_URL + '/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });

        if(!res.ok){
          hideThinking();
          const errMsg = res.status === 429
            ? "You've reached the message limit for this session. Please book a call at shiftaiconsulting.co.uk to continue."
            : "Something went wrong. Please try again in a moment.";
          appendMsg('assistant', errMsg);
          isBusy = false; sendBtn.disabled = false; return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = '';

        while(true){
          const { done, value } = await reader.read();
          if(done) break;

          buf += decoder.decode(value, { stream: true });
          const lines = buf.split('\n');
          buf = lines.pop(); // keep incomplete line

          for(const line of lines){
            if(!line.startsWith('data: ')) continue;
            const payload = line.slice(6);

            if(payload === '[DONE]') break;

            if(payload === '[RESET]'){
              // Server intercepted a forbidden output: clear current streaming bubble
              resetPending = true;
              if(assistantDiv){ assistantDiv.remove(); assistantDiv = null; }
              assistantText = '';
              firstToken = true;
              continue;
            }

            if(payload.startsWith('[ERROR]')){
              hideThinking();
              appendMsg('assistant', payload.slice(8));
              isBusy = false; sendBtn.disabled = false; return;
            }

            // Normal text chunk (JSON string)
            let chunk;
            try{ chunk = JSON.parse(payload); } catch{ chunk = payload; }

            if(firstToken){ hideThinking(); firstToken = false; }

            if(!assistantDiv){
              assistantDiv = appendMsg('assistant', '');
            }
            assistantText += chunk;
            assistantDiv.textContent = assistantText;
            scrollBottom();
          }
        }

      } catch(err){
        hideThinking();
        appendMsg('assistant', "Connection error. Please check your network and try again.");
        isBusy = false; sendBtn.disabled = false; return;
      }

      if(assistantDiv) assistantDiv.innerHTML = marked.parse(linkifyText(assistantText));
      if(assistantText){
        history.push({ role: 'assistant', content: assistantText });
      }

      isBusy = false;
      sendBtn.disabled = input.value.trim().length === 0;
      input.focus();
    }
  }

  inject();
  loadMarked(setup);
})();
