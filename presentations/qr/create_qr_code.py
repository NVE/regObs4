import qrcode
import qrcode.image.svg
from qrcode.image.styledpil import StyledPilImage


qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)
qr.add_data("https://regobs.z1.web.core.windows.net/")
img = qr.make_image(
    # image_factory=qrcode.image.svg.SvgPathImage,
    image_factory=StyledPilImage,
    embeded_image_path="../regobs.png"
)

img.save("../qr.png")
