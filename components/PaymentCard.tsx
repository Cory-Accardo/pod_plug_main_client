import { useCookies } from "react-cookie";
import { useCallback } from "react";
import { useRouter } from "next/router";

import { API, JSON_HEADER } from "../constants";
import imageFromCardBrand from "../hooks/imageFromCardBrand";

interface PaymentCardProps {
  brand: string;
  funding: string;
  last4: string;
  name: string;
  year: number;
  month: number;
  default: boolean;
  cardId: string;
  updateCards: (any) => void;
  updateDefault: (any) => void;
}

function formatCardName(name: string, funding: string) {
  let result = "";
  switch (name.toLowerCase()) {
    case "visa":
      result += "Visa ";
      break;
    case "mastercard":
      result += "MasterCard ";
      break;
    case "amex":
      result += "American Express ";
      break;
    case "diners":
      result += "Diners Club ";
      break;
    case "discover":
      result += "Discover ";
      break;
    case "jcb":
      result += "JCB ";
      break;
    case "unionpay":
      result += "UnionPay ";
      break;
  }
  switch (funding.toLowerCase()) {
    case "credit":
      return result + "Credit Card";
    case "debit":
      return result + "Debit Card";
    case "prepaid":
      return result + "Prepaid Card";
    default:
      return result + "Card";
  }
}

const PaymenCard: React.FC<PaymentCardProps> = (props) => {
  const router = useRouter();
  const [cookies] = useCookies(["x-token", "x-refresh-token"]);
  const removeCard = useCallback(
    (updateAfterDelete: boolean) => {
      fetch(API + "/auth/remove_card", {
        method: "DELETE",
        headers: {
          ...JSON_HEADER,
          "x-token": cookies["x-token"],
          "x-refresh-token": cookies["x-refresh-token"],
        },
        body: JSON.stringify({
          card: props.cardId,
        }),
      }).then(() => {
        if (updateAfterDelete) {
          props.updateCards(cookies);
          props.updateDefault(cookies);
        }
      });
    },
    [cookies, props]
  );
  const setAsDefault = useCallback(() => {
    fetch(API + "/auth/update_default_payment", {
      method: "PUT",
      headers: {
        ...JSON_HEADER,
        "x-token": cookies["x-token"],
        "x-refresh-token": cookies["x-refresh-token"],
      },
      body: JSON.stringify({
        card: props.cardId,
      }),
    }).then(() => {
      props.updateDefault(cookies);
    });
  }, [cookies, props]);

  return (
    <div className="m-4 py-4 px-8 bg-white rounded-xl shadow-lg w-96 max-w-full flex flex-col">
      <div className="flex flex-row">
        <div>
          <div className="font-bold">
            {formatCardName(props.brand, props.funding)} ****{props.last4}
          </div>
          {props.name && <div className="font-semibold">{props.name}</div>}
          <div>
            Expires {String(props.month).padStart(2, "0")}/{props.year}
          </div>
        </div>
        <img
          src={imageFromCardBrand(props.brand)}
          alt="Credit card image"
          className="ml-auto self-center"
          style={{ height: "48px", width: "48px" }}
        />
      </div>
      <div className="flex flex-row mt-3">
        <button
          className="w-1/2 mr-1 button-light"
          onClick={() => {
            router.push("/setup_card?edit=" + escape(props.cardId));
          }}
        >
          Edit
        </button>
        <button
          className="w-1/2 ml-1 button-light"
          onClick={() => removeCard(true)}
        >
          Remove
        </button>
      </div>
      {props.default && (
        <div className="text-center mt-2 border-2 border-subtitle-gray rounded-md">
          Default
        </div>
      )}
      {!props.default && (
        <button
          className="flex-grow mt-2 button-light"
          onClick={() => setAsDefault()}
        >
          Set as Default
        </button>
      )}
    </div>
  );
};

export default PaymenCard;
