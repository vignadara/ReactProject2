import React, { useContext } from "react";
import { RES_IMAGE } from "../utils/constants";
import UserContext from "./UserContext";


const RestaurantCard = (props) => {
    const { resData } = props;
    const { loggedUser } = useContext(UserContext);
    const {
        name,
        cloudinaryImageId,
        cuisines,
        costForTwo,
    } = resData;

    return (
        <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">
            <img className="res-logo" alt= "res-logo" src={RES_IMAGE + cloudinaryImageId}/>
            <h3>{ name }</h3>
            <h4>{ cuisines.join(", ") }</h4>
            <h4>{ costForTwo }</h4>
            <h5>{ resData.avgRatingString } Stars</h5>
            <h5>{loggedUser}</h5>
       </div>
    )
};

export const withPromtedLabel = (RestaurantCard) => {
    return (props) => {
      return (
        <div>
          <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
            Promoted
          </label>
          <RestaurantCard {...props} />
        </div>
      );
    };
  };
export default RestaurantCard;