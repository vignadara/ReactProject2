import React, { useContext, useEffect } from "react";
import RestaurantCard, { withPromtedLabel }from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "./UserContext";


const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();

        setListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setLoading(false);
    };

    const onlineStatus = useOnlineStatus();


    if(onlineStatus === false){
        return (
            <h1>You are offline. please check your internet connectivity</h1>
        );
    };

    if(loading) {
        return (
            <h1>Loading</h1>
        )
    }

    const { loggedUser, setUserName } = useContext(UserContext);


    return listOfRestaurants?.length === 0 ? (
              <Shimmer /> 
    ) : (
            <div className="body">
                <div className="flex">
                    <div className="p-4 m-4">
                        <input type="text" className="border border-solid border-black" value={searchText} onChange={(e) => {
                            setSearchText(e.target.value);
                        }}></input>
                        <button className="px-2 py-2 m-4 bg-green-100 rounded-lg" onClick={() => {
                            const filteredRestaurants = listOfRestaurants.filter((res) =>
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );
                            setFilteredRestaurants(filteredRestaurants);
                        }}>Search</button>
                    </div>
                    <div className="flex m-4 p-4">
                        <button className="px-4 py-2 m-4 bg-gray-400 rounded-lg" onClick={() => {
                            const filteredData =  listOfRestaurants.filter((res) => {
                                return res.info.avgRatingString > 4;
                            });
                            setFilteredRestaurants(filteredData);
                        }}>Top Rated Restaurant</button>
                    </div>
                    <div className="flex m-4 p-4">
                        <label>Username: </label>
                        <input 
                            className="border border-black"
                            value={loggedUser}
                            onChange={(e) => setUserName(e.target.value)}></input>
                    </div>
                </div>
                <div className="flex flex-wrap">
                {filteredRestaurants?.map((restaurant) => (
                    <Link
                        key={restaurant?.info.id}
                        to={"/restaurants/" + restaurant?.info.id}
                    >
                        {restaurant?.info.promoted ? (
                        <RestaurantCardPromoted resData={restaurant?.info} />
                        ) : (
                        <RestaurantCard resData={restaurant?.info} />
                        )}
                    </Link>
        ))}
                </div>

            </div>
    );
};

export default Body;