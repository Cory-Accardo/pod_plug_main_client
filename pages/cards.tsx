import Head from "next/head";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import PaymenCard from "../components/PaymentCard";
import Link from "next/link";

import SignupHeader from "../components/SignupHeader";
import { API } from "../constants";
import useSignedInOnly from "../hooks/useSignedInOnly";

const Cards: React.FC = () => {
  useSignedInOnly("/cards");
  const [cookies] = useCookies(["x-token", "x-refresh-token"]);
  const [cards, setCards] = useState(undefined);
  const [defaultCard, setDefaultCard] = useState(undefined);

  const updateCards = (_cookies) => {
    fetch(API + "/auth/list_cards", {
      method: "POST",
      headers: {
        "x-token": _cookies["x-token"],
        "x-refresh-token": _cookies["x-refresh-token"],
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setCards(json.data);
      });
  };

  const updateDefault = (_cookies) => {
    fetch(API + "/auth/get_default_payment", {
      method: "POST",
      headers: {
        "x-token": _cookies["x-token"],
        "x-refresh-token": _cookies["x-refresh-token"],
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((json) => {
        setDefaultCard(json.slice(1, -1));
      });
  };

  useEffect(() => {
    updateCards(cookies);
    updateDefault(cookies);
  }, [cookies]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <title>Your Cards - Pod Plug</title>
        </Head>
        <SignupHeader text="home" link="/" />
        <main className="bg-background-gray flex-grow flex flex-col items-center px-8 pt-12">
          {defaultCard &&
            cards &&
            cards.map((card, index) => {
              return (
                <PaymenCard
                  key={index}
                  name={card.billing_details.name}
                  brand={card.card.brand}
                  funding={card.card.funding}
                  last4={card.card.last4}
                  month={card.card.exp_month}
                  year={card.card.exp_year}
                  default={card.id == defaultCard}
                  cardId={card.id}
                  updateCards={updateCards}
                  updateDefault={updateDefault}
                />
              );
            })}
          {cards && cards.length === 0 && (
            <div className="mx-8 mt-16 font-semibold text-2xl mb-8">
              No payment method added
            </div>
          )}
          {cards && cards.length < 3 && (
            <Link href="/setup_card" passHref>
              <a className="m-4 py-4 px-8 bg-white rounded-xl shadow-lg w-96 max-w-full font-bold text-center">
                Add Card
              </a>
            </Link>
          )}
        </main>
      </div>
    </>
  );
};

export default Cards;
