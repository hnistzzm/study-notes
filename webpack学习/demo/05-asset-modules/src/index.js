import helloWrold from './hello-world'
import image from './assets/test.jpg'
import text from './assets/abc.txt'
helloWrold()

var img = document.createElement('img')
img.src = image
img.style.cssText = `width:600px;height:300px;`
document.body.appendChild(img)

const block = document.createElement('div')
block.textContent = text
block.style.cssText = `width:200px;height:200px;background:aliceblue`
document.body.appendChild(block)