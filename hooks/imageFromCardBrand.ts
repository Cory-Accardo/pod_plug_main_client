export default function imageFromCardBrand(name: string): string {
  switch (name.toLowerCase()) {
    case "visa":
      return "/visa_electron.png";
    case "mastercard":
      return "/mastercard.png";
    case "amex":
      return "/american_express.png";
    case "diners":
      return "/diners_club.png";
    case "discover":
      return "/discover.png";
    case "jcb":
      return "/jcb.png";
    case "unionpay":
      return "/china_union.png";
    default:
      return "/credit_card.png";
  }
}
