import * as React from "react";
import axios from "axios";
import {isExceptionResponseInterface, isImageResponseInterface} from "../interfaces/ImageResponse";
import {startLoading} from "./Loading";

export default class ImageForm extends React.Component<any, any> {
    handleClick() {
        const formData = new FormData();
        const imageFile = document.querySelector<HTMLInputElement>('#formFile');

        if (imageFile.files.length == 0) {
            alert('No File selected.');
            return;
        }

        formData.append("image", imageFile.files[0]);
        const imagePreview = document.querySelector<HTMLElement>("#imagePreview");
        startLoading(imagePreview)
        axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
            imagePreview.innerHTML = '';
            const image = document.createElement('img');

            if (isExceptionResponseInterface(r.data)) {
                alert(r.data.exception);
                return;
            }

            if (!isImageResponseInterface(r.data)) {
                alert(`Error: response format doesn't correspond to the interface. Please try again.`);
                return;
            }

            image.src = r.data.filename;
            imagePreview.appendChild(image);
        }).catch(e => {
            alert(`Error occurred while trying to upload sample image.`);
            console.log(e);
        });
    }

    render() {
        return (
            <div>
                <div className="row align-items-end w-100">
                    <div className="col-10" style={{paddingLeft: 0}}>
                        <input className="form-control pl-0" type="file" id="formFile"
                               accept="image/png, image/jpeg, image/webp"/>
                    </div>
                    <div className="col-2 px-0">
                        <button type="button" className="btn btn-primary w-100"
                                onClick={() => this.handleClick()}>Upload
                        </button>
                    </div>
                </div>
                <div id="imagePreview" style={{background: "#fff", height: 320, textAlign: 'center'}}
                     className="row align-items-end w-100 mt-3 position-relative border"></div>
            </div>
        )
    }
}