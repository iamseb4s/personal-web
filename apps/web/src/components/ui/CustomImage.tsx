import Image from 'next/image';

interface CustomImageProps {
  src: string;
  alt: string;
  width?: string;
  caption?: string;
}

const CustomImage = ({ src, alt, width = '100%', caption }: CustomImageProps) => {
  return (
    <figure className="my-8 flex flex-col items-center">
      <div style={{ width: width }} className="relative">
        <Image
          src={src}
          alt={alt}
          width={1200} // Base width for optimization
          height={800} // Base height for optimization
          className="h-auto w-full rounded-md object-contain"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-foreground/70 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default CustomImage;
