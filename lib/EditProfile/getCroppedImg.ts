import type { Area } from "react-easy-crop";

function createImg(imgUrl: string): Promise<HTMLImageElement> {
        return (
            new Promise((resolve, reject) => {
                const image = new Image();
                image.addEventListener("load", () => resolve(image));
                image.addEventListener("error", (error) => reject(error));
                image.src = imgUrl;
            })
        )
    }

export default async function getCroppedImg(imgUrl: string, pixelCrop: Area): Promise<string | null> {
    try {
        const img = await createImg(imgUrl);

        if (!img) {
            throw Error("Unable to complete createImg() promise.");
        }

        const croppedCanvas = document.createElement("canvas");
        const croppedCtx = croppedCanvas.getContext("2d");

        if (!croppedCtx) {
            throw Error("Unable to create Canvas context");
        }

        croppedCanvas.width = pixelCrop.width;
        croppedCanvas.height = pixelCrop.height;

        croppedCtx.drawImage(
            img,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return (new Promise((resolve, reject) => {
            croppedCanvas.toBlob((file: any) => { // FIX ME
                resolve(URL.createObjectURL(file))
            }, "image/jpeg");
        }));
    } catch (e) {
        console.error("[ERROR]: ", e);
        return null;
    }
}