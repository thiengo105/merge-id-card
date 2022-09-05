import { Image } from "react-konva";
import useImage from "use-image";
import Konva from "konva";

type ImageProps = Omit<Konva.ImageConfig, "image">;

type KonvaImageProps = {
  url: string
}

const KonvaImage: React.FC<KonvaImageProps & ImageProps> = ({ url, ...imageProps }) => {
  const [image] = useImage(url);
  return <Image image={image} {...imageProps} />
}

export default KonvaImage;