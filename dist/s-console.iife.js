var sconsole=(function(){"use strict";class o{container=null;inputField=null;consoleArea=null;commands=new Map;options={fontSize:"14px",fontFamily:"monospace",theme:"dark"};constructor(e,t){e&&(this.container=document.getElementById(e)),t&&(this.options={...this.options,...t}),this.init(),this.setupDefaultCommands(),window.sConsole=this}init(){this.createConsole(),this.setupEventListeners()}setupDefaultCommands(){this.addCommand("help",()=>{const e=Array.from(this.commands.keys()).join(", ");this.appendToConsole(`Available commands: ${e}`)}),this.addCommand("clear",()=>{this.clear()})}createConsole(){const e=`
                <div class=":uno: rounded-lg border-2 border-solid border-#1e1e1e">
                    <div class=":uno: text-gray-700 text-sm font-bold my-2 px-3 flex justify-between">
                        <label>Console</label>
                        <div>
                            <svg class="close-button :uno: bg-#1e1e1e cursor-pointer p-1 text-white rounded-md" width="20" height="20" viewBox="0 0 20 20">
                                <path d="M 3 17 L 17 3 M 3 3 L 17 17" stroke="white" stroke-width="2" fill="none" />
                            </svg>
                        </div>
                    </div>
                    <div class=":uno: px-3 bg-#1e1e1e h-56 overflow-y-auto w-full text-white p-3" id="consoleParent">
                        <div class=":uno: bg-#1e1e1e w-full" id="consoleOutput"></div>
                        <div class=":uno: flex">
                            <p class=":uno: text-white">User> </p>
                            <input id="consoleInput" class=":uno: bg-#1e1e1e focus:outline-none w-full text-white" type="text">
                        </div>
                    </div>
                </div>
        `;if(this.container)this.container.innerHTML=e;else{const t=document.createElement("div");t.innerHTML=e,document.body.appendChild(t),this.container=t}this.inputField=this.container.querySelector("#consoleInput"),this.consoleArea=this.container.querySelector("#consoleOutput"),this.applyFontStyles()}applyFontStyles(){this.consoleArea&&(this.consoleArea.style.fontSize=this.options.fontSize,this.consoleArea.style.fontFamily=this.options.fontFamily),this.inputField&&(this.inputField.style.fontSize=this.options.fontSize,this.inputField.style.fontFamily=this.options.fontFamily)}setupEventListeners(){if(!this.inputField||!this.consoleArea)return;const e=this.container?.querySelector(".close-button"),t=this.container?.querySelector("#consoleParent");e?.addEventListener("click",()=>{this.clear()}),t?.addEventListener("click",()=>{this.inputField?.focus()}),this.inputField.addEventListener("keyup",n=>{n.key==="Enter"&&this.handleInput(this.inputField.value)})}handleInput(e){this.appendToConsole(`User> ${e}`),this.commands.has(e)?this.commands.get(e)():this.appendToConsole(`<span class=":uno: text-red-500">Unknown command: ${e}</span>`),this.inputField.value="",this.scrollToBottom()}addCommand(e,t){this.commands.set(e,t)}updateOptions(e){this.options={...this.options,...e},this.applyFontStyles(),this.appendToConsole("Options updated")}appendToConsole(e){this.consoleArea&&(this.consoleArea.innerHTML+=`<p>${e}</p>`)}clear(){this.consoleArea&&(this.consoleArea.innerHTML=""),this.inputField&&(this.inputField.value="")}scrollToBottom(){const e=this.container?.querySelector("#consoleParent");e&&(e.scrollTop=e.scrollHeight)}}return o})();
