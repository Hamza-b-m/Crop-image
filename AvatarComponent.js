import React, { useState, useRef } from "react";
import "../styles/AvatarComponent.css";
import AvatarEditor from "react-avatar-editor";
import Slider from "@material-ui/core/Slider";

const AvatarComponent = ({
  setCropWrapper,
  setImageToCrop,
  imageToCrop,
  setSelectedAvatar,
}) => {
  const [zoomValue, setZoomValue] = useState(1.3);
  const imageHandleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageToCrop(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const avatarRef = useRef();
  const [preview, setPreview] = useState();

  const handleCrop = () => {
    setPreview(avatarRef.current.getImage().toDataURL());
  };

  return (
    <div className="crop-wrapper">
      <div className="crop-backdrop" onClick={() => setCropWrapper(false)} />
      <div className="crop-box">
        <div className="crop-top">
          <div className="crop-left">
            <div
              className={
                imageToCrop ? "imageToCrop imageToCropBorder" : "imageToCrop"
              }
            >
              <div className="delete-imageToCrop">
                <i
                  className="fas fa-times"
                  onClick={() => {
                    setImageToCrop();
                    setZoomValue(1.3);
                    setPreview();
                  }}
                ></i>
              </div>
              {imageToCrop ? (
                <AvatarEditor
                  image={imageToCrop}
                  width={250}
                  height={250}
                  ref={avatarRef}
                  border={75}
                  color={[255, 255, 255, 0.6]}
                  scale={zoomValue}
                  borderRadius={120}
                  onMouseUp={handleCrop}
                  onLoadSuccess={handleCrop}
                />
              ) : (
                <div className="imageToCrop-container">
                  <label htmlFor="imageToCrop">Choose an image</label>
                  <input
                    type="file"
                    id="imageToCrop"
                    onChange={imageHandleChange}
                  />
                </div>
              )}
            </div>
            {imageToCrop && (
              <div className="zoom-slider">
                <div className="zoom-slider-left">Zoom : </div>
                <div className="zoom-slider-right">
                  <Slider
                    value={zoomValue}
                    min={0}
                    max={2}
                    step={0.1}
                    onChange={(e, value) => setZoomValue(value)}
                    onChangeCommitted={handleCrop}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="crop-right">
            {preview && (
              <div className="preview-container">
                <img src={preview} alt="" />
              </div>
            )}
          </div>
        </div>
        <div className="crop-bottom">
          <button
            onClick={() => {
              setSelectedAvatar(preview);
              setCropWrapper(false);
            }}
          >
            Done
          </button>
          <button onClick={() => setCropWrapper(false)}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AvatarComponent;
