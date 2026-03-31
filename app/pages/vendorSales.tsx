import { useEffect, useState } from "react";
import CurrentVendorInventory from "~/components/currentVendorInventory";
import Navbar from "~/components/navbar";
import { type currentVendorSalesLoaderData, type masterWork } from "~/utils/types";
import { selectedPerkWithState } from "~/utils/types";
import { ReactSVG } from "react-svg";
import closeButton from "~/src/assets/icons/close-button.svg";
import BurgerMenu from "~/components/burger-menu";

export default function CurrentVendorInventoryPage(data: currentVendorSalesLoaderData) {
  const [selectedItemPerkState, setSelectedItemPerkState] = useState<selectedPerkWithState>(null);
  const [selectedItemMasterWorkState, setSelectedItemMasterWorkState] = useState<masterWork | null>(null);
  const [burgerMenuState, setBurgermenuState] = useState<Boolean>(false);
  /* console.log(data); */
  const userData = data.userData;
  useEffect(() => {
    if (selectedItemPerkState || selectedItemMasterWorkState) {
      document.body.classList.add("body-disable-scroll");
    } else if (!selectedItemPerkState) {
      document.body.classList.remove("body-disable-scroll");
    }
  });
  console.log(selectedItemPerkState);

  if (selectedItemPerkState) {
    return (
      <>
        <div
          onClick={() => {
            setSelectedItemPerkState(null);
          }}
          className="vendorSales-blur-container"
        >
          <header>
            <Navbar userData={userData}></Navbar>
          </header>
          <main>
            <CurrentVendorInventory
              {...data}
              setSelectedItemPerkForDisplayFunction={setSelectedItemPerkState}
              selectedItemPerkState={selectedItemPerkState}
            ></CurrentVendorInventory>
          </main>
        </div>
        <div className="detailed-perk-info-container-container">
          <div className="detailed-info-close-button-container">
            <ReactSVG
              onClick={() => {
                setSelectedItemPerkState(null);
              }}
              className="close-button"
              src={closeButton}
            ></ReactSVG>
          </div>
          <div className="detailed-perk-info-container">
            <div className="detailed-perk-info-image-container">
              <img
                className="detailed-perk-info-image"
                src={`http://www.bungie.net${selectedItemPerkState.perkIcon}`}
              />
            </div>
            <h2>{selectedItemPerkState.perkName}</h2>
            <p>{selectedItemPerkState.perkDescription}</p>
          </div>
        </div>
      </>
    );
  } else if (selectedItemMasterWorkState) {
    return (
      <>
        <div
          onClick={() => {
            setSelectedItemMasterWorkState(null);
          }}
          className="vendorSales-blur-container"
        >
          <header>
            <Navbar userData={userData}></Navbar>
          </header>
          <main>
            <CurrentVendorInventory
              {...data}
              setSelectedItemPerkForDisplayFunction={setSelectedItemPerkState}
              selectedItemPerkState={selectedItemPerkState}
            ></CurrentVendorInventory>
          </main>
        </div>
        <div className="detailed-masterwork-info-container-container">
          <div className="detailed-info-close-button-container">
            <ReactSVG
              onClick={() => {
                setSelectedItemMasterWorkState(null);
              }}
              className="close-button"
              src={closeButton}
            ></ReactSVG>
          </div>
          <div className="detailed-masterwork-info-container">
            <div className="detailed-masterwork-info-image-container">
              <img
                className="detailed-masterwork-info-image"
                src={`http://www.bungie.net${selectedItemMasterWorkState.masterWorkIcon}`}
              />
            </div>
            <h2>{selectedItemMasterWorkState.masterWorkName}</h2>
            <p>{selectedItemMasterWorkState.masterWorkDescription}</p>
          </div>
        </div>
      </>
    );
  } else if (burgerMenuState) {
    return (
      <>
        <div
          onClick={() => {
            setBurgermenuState(false);
          }}
          className="vendorSales-blur-container"
        >
          <header>
            <Navbar userData={userData}></Navbar>
          </header>
          <main>
            <CurrentVendorInventory
              {...data}
              setSelectedItemPerkForDisplayFunction={setSelectedItemPerkState}
              selectedItemPerkState={selectedItemPerkState}
            ></CurrentVendorInventory>
          </main>
        </div>
        <BurgerMenu setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></BurgerMenu>;
      </>
    );
  }
  return (
    <>
      <header>
        <Navbar setBurgerMenuStateFunction={setBurgermenuState} userData={userData}></Navbar>
      </header>
      <main>
        <CurrentVendorInventory
          {...data}
          setSelectedItemPerkForDisplayFunction={setSelectedItemPerkState}
          selectedItemPerkState={selectedItemPerkState}
          setSelectedItemMasterworkForDisplayFunction={setSelectedItemMasterWorkState}
          selectedItemMasterWorkState={selectedItemMasterWorkState}
        ></CurrentVendorInventory>
      </main>
    </>
  );
}
