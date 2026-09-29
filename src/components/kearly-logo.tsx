import logoAsset from "@/assets/kearly-logo.png.asset.json";

type KearlyLogoProps = {
  className?: string;
};

export function KearlyLogo({ className }: KearlyLogoProps) {
  return <img className={className} src={logoAsset.url} alt="" aria-hidden="true" />;
}