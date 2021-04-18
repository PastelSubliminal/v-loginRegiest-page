
export default function debounce(f,time){
  let timeId = null
  return function(...argments){
    clearTimeout(timeId)
      var timeId=setTimeout(f(argments),time)
  }
}