import { Avatar, Badge } from "antd";
import Resizer from "react-image-file-resizer";
import useAuth from "../../hooks/useAuth";
import http from "../../utils/http";

interface PropsParam {
  values: any;
  setValues: (param: any) => void;
  setLoading: (param: boolean) => void;
}

function FilesUpload({ values, setValues, setLoading }: PropsParam) {
  const { auth } = useAuth();

  const fileUploadAndResize = (e: any) => {
    console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            http
              .post(
                `uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: auth ? auth.idToken : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  const handleImageRemove = (public_id: string) => {
    setLoading(true);
    console.log("remove image", public_id);
    http
      .post(
        `removeimage`,
        { public_id },
        {
          headers: {
            authtoken: auth ? auth.idToken : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item: any) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image: any) => (
            <div onClick={() => handleImageRemove(image.public_id)}>
              <Badge
                count="X"
                key={image.public_id}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  src={image.url}
                  size={100}
                  shape="square"
                  className="ml-3"
                />
              </Badge>
            </div>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
}

export default FilesUpload;
