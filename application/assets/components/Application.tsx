import * as React from "react";
import ImageForm from "./ImageForm";

export default class Application extends React.Component<any, any> {

    render() {
        return (
            <div className="container">
                <div className="d-flex flex-column justify-content-center">
                    <ImageForm/>
                </div>
            </div>
        );
    }
}