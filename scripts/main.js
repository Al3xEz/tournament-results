const takeScreenShot = () => {
  const element = document.getElementById('post')
  html2canvas(element)
    .then((canvas) => {
      const image = canvas.toDataURL('image/jpg')
      const a = document.createElement('a')
      a.href = image
      a.download = `post.jpg`
      a.click()
    })
    .catch(console.error)
}
