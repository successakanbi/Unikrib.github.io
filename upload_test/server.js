const express = require("express")
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

require("dotenv").config()

const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const ImageKit = require("imagekit")

const imageKit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

app.post("/upload_files", upload.single("file"), uploadFile)

function uploadFile(req, res) {
	if (req.file) {
		imageKit.upload({
			file: req.file,
			fileName: req.filename,
			folder: 'user_avatars'
		}, function(err, response) {
			if(err) {
				return res.status(500).json({
					status: 'failed',
					message: "An error occured during file upload. Please try again later" + err,
				})
			} else {
				const { url } = response
				const modifiedUrl = imageKit.url({
					src: url,
					transformation: [
						{
							height: '100',
							width: '100',
							quality: '50',
							format: 'png'
						}
					]
				})
				res.json({ status: "success", message: "Successfully uploaded images" });
			}
		})
	}
}

app.listen(8005, () => {
  console.log(`Server started...`)
})
