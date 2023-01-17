const form = document.getElementById("form")
const uploadedImgElem = document.getElementById("uploaded-img")

form.addEventListener("submit", submitForm)

function submitForm(e) {
  e.preventDefault()
  const fileInput = document.getElementById("file")
  const file = fileInput.files[0]
  const formData = new FormData()
  formData.append("file", file)
  const response = fetch("http:/54.173.52.4:8005/upload_files", {
    method: "post",
    body: formData,
  })
    .then(res => (uploadedImgElem.src = response.url))
    .catch(err => ("Error occured", err))
}
