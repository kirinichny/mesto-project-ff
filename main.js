(()=>{"use strict";var t={IS_OPENED:"popup_is-opened",CLOSE_BUTTON:"popup__close"},e="Escape";function n(n){n.key===e&&o(n.target.querySelector(".".concat(t.IS_OPENED)))}function r(e){e.classList.add(t.IS_OPENED),document.addEventListener("keydown",n)}function o(e){e.classList.remove(t.IS_OPENED),document.removeEventListener("keydown",n)}function i(t){var e=t.formElement,n=t.inputElement,r=t.errorClasses,o=e.querySelector(".".concat(n.id,"-error"));n.classList.remove(r.inputErrorClass),o.classList.remove(r.errorClass),o.textContent=""}function a(t){var e=t.inputList,n=t.buttonElement,r=t.inactiveButtonClass;!function(t){return t.some((function(t){return!t.validity.valid}))}(e)?n.classList.remove(r):n.classList.add(r)}function c(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector),o=e.inactiveButtonClass,c={inputErrorClass:e.inputErrorClass,errorClass:e.errorClass};n.forEach((function(e){return i({formElement:t,inputElement:e,errorClasses:c})})),a({inputList:n,buttonElement:r,inactiveButtonClass:o})}var u={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"98e03516-e97b-49fe-bfd1-0cb42464d9af","Content-Type":"application/json"}};function l(t){return fetch("".concat(u.baseUrl,"/").concat(t.endpoint),{headers:u.headers,method:t.method,body:JSON.stringify(t.body)}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}function s(t){return l({method:"PUT",endpoint:"cards/likes/".concat(t)})}function d(t){return l({method:"DELETE",endpoint:"cards/likes/".concat(t)})}function m(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var p,f,v=document.querySelector(".places__list"),y=document.querySelector("#card-template").content.children[0],_=document.querySelector(".profile__image"),C=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),b=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),S=document.querySelector(".popup_type_update-avatar"),h=document.querySelector(".popup_type_edit"),L=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_confirm-delete-card"),q=document.querySelector(".popup_type_image"),x=document.querySelectorAll(".popup"),A=q.querySelector(".popup__image"),B=q.querySelector(".popup__caption"),D=document.forms["update-avatar"],I=document.forms["edit-profile"],T=document.forms["new-place"],O=document.forms["confirm-delete-card"],P={image:"card__image",title:"card__title",deleteButton:"card__delete-button",likeButton:"card__like-button",likeButtonIsActive:"card__like-button_is-active",likeCounter:"card__like-counter"},w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"};function j(t){!function(t){A.src=t.link,A.alt=t.name,B.textContent=t.name}(t),r(q)}function N(t,e){p=t,f=e,r(g)}function U(t,e,n){var r=function(t){var e=t.cardData,n=t.cardTemplate,r=t.cardClasses,o=t.currentUserId,i=t.onClick,a=t.onAddLike,c=t.onDeleteLike,u=t.onDelete,l=n.cloneNode(!0),s=l.querySelector(".".concat(r.image)),d=l.querySelector(".".concat(r.title)),m=l.querySelector(".".concat(r.deleteButton)),p=l.querySelector(".".concat(r.likeButton)),f=l.querySelector(".".concat(r.likeCounter)),v=e.owner._id===o,y=e.likes.some((function(t){return t._id===o}));return s.src=e.link,s.alt=e.name,d.textContent=e.name,f.textContent=e.likes.length,y&&p.classList.add(r.likeButtonIsActive),v?m.addEventListener("click",(function(){return u(e._id,l)})):m.remove(),s.addEventListener("click",(function(){i(e)})),p.addEventListener("click",(function(t){return function(t){var e=t.cardId,n=t.likeCounterElement,r=t.likeIsActiveClass,o=t.onAddLike,i=t.onDeleteLike,a=t.evt.target,c=a.classList.contains(r);(c?i(e):o(e)).then((function(t){c?a.classList.remove(r):a.classList.add(r),n.textContent=t.likes.length})).catch((function(t){return console.log(t)}))}({evt:t,cardId:e._id,likeCounterElement:f,likeIsActiveClass:r.likeButtonIsActive,onAddLike:a,onDeleteLike:c})})),l}({cardData:t,cardTemplate:y,cardClasses:P,currentUserId:n,onClick:j,onAddLike:s,onDeleteLike:d,onDelete:N});!function(t,e){"start"===(arguments.length>2&&void 0!==arguments[2]?arguments[2]:"end")?t.prepend(e):t.append(e)}(v,r,e)}Promise.all([l({method:"GET",endpoint:"users/me"}),l({method:"GET",endpoint:"cards"})]).then((function(t){var e,n,r,o,i,a=(i=2,function(t){if(Array.isArray(t))return t}(o=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,a,c=[],u=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=i.call(n)).done)&&(c.push(r.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(o,i)||function(t,e){if(t){if("string"==typeof t)return m(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(t,e):void 0}}(o,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=a[0],u=a[1];e=c,_.style.backgroundImage="url(".concat(e.avatar,")"),C.textContent=e.name,E.textContent=e.about,n=u,r=c._id,n.map((function(t){return U(t,"end",r)}))})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t){var e=t.formElement,n=t.validationParams,r=Array.from(e.querySelectorAll(n.inputSelector)),o=e.querySelector(n.submitButtonSelector),c=n.inactiveButtonClass,u={inputErrorClass:n.inputErrorClass,errorClass:n.errorClass};r.forEach((function(t){t.addEventListener("input",(function(){!function(t){var e=t.formElement,n=t.inputElement,r=t.errorClasses;n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?i({formElement:e,inputElement:n,errorClasses:r}):function(t){var e=t.inputElement,n=t.errorClasses,r=t.formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(n.inputErrorClass),r.classList.add(n.errorClass),r.textContent=e.validationMessage}({formElement:e,inputElement:n,errorClasses:r})}({formElement:e,inputElement:t,errorClasses:u}),a({inputList:r,buttonElement:o,inactiveButtonClass:c})}))}))}({formElement:e,validationParams:t})}))}(w),_.addEventListener("click",(function(){c(D,w),r(S)})),b.addEventListener("click",(function(){c(I,w),function(t,e,n){t.elements.name.value=e,t.elements.description.value=n}(I,C.textContent,E.textContent),r(h)})),k.addEventListener("click",(function(){c(T,w),r(L)})),D.addEventListener("submit",(function(t){t.preventDefault();var e=t.target,n=t.submitter,r=n.textContent,i=e.link.value;n.textContent+="...",function(t){return l({method:"PATCH",endpoint:"users/me/avatar",body:{avatar:t}})}(i).then((function(t){_.style.backgroundImage="url(".concat(t.avatar,")"),o(S),e.reset()})).catch((function(t){console.log(t)})).finally((function(){n.textContent=r}))})),I.addEventListener("submit",(function(t){t.preventDefault();var e=t.target,n=t.submitter,r=n.textContent,i={name:e.name.value,about:e.description.value};n.textContent+="...",function(t){return l({method:"PATCH",endpoint:"users/me",body:{name:t.name,about:t.about}})}(i).then((function(t){C.textContent=t.name,E.textContent=t.about,o(h)})).catch((function(t){console.log(t)})).finally((function(){n.textContent=r}))})),T.addEventListener("submit",(function(t){t.preventDefault();var e=t.target,n=t.submitter,r=n.textContent,i={name:e["place-name"].value,link:e.link.value};n.textContent+="...",function(t){return l({method:"POST",endpoint:"cards",body:{name:t.name,link:t.link}})}(i).then((function(t){U(t,"start",t.owner._id),o(L),e.reset()})).catch((function(t){console.log(t)})).finally((function(){n.textContent=r}))})),O.addEventListener("submit",(function(t){t.preventDefault();var e,n=t.submitter,r=n.textContent;n.textContent="Удаление...",(e=p,l({method:"DELETE",endpoint:"cards/".concat(e)})).then((function(t){f.remove(),o(g)})).catch((function(t){console.log(t)})).finally((function(){n.textContent=r}))})),x.forEach((function(e){e.addEventListener("click",(function(n){var r=n.target.classList.contains(t.CLOSE_BUTTON),i=n.target===this;(r||i)&&o(e)}))}))})();