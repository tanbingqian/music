export function addClass(el, className){
   if(hasClass(el, className)){
     return
   }

   let newClass = el.className.split(' ');
   newClass.push(className);
   el.className = newClass.join(' ')
}

export function hasClass(el, className){
  //怎么看它已经有CLASS呢，创建正则
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className)
}