import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    ads: any[];
    ad: {
        userid: string;
        image: string;
        title: string;
        description: string;
        totalImpressions: number;
        date: string;
        approved: boolean;
    };
} = {
    ads: [],
    ad: {
        userid: "",
        image: "",
        title: "",
        description: "",
        totalImpressions: 0,
        date: "",
        approved: false,
    },
};


const adSlice = createSlice({
    name: "ads",
    initialState,
    reducers: {
      addAd: (state, action) => {
        state.ads = [
          { ...action.payload },
          ...state.ads,
        ];
      },
      deleteAd: (state, action) => {
        state.ads = state.ads.filter(
          (ad) => ad._id !== action.payload,
        );
      },
      updateAd: (state, action) => {
        state.ads = state.ads.map((ad) => {
          if (ad._id === action.payload._id) {
            return action.payload;
          } else {
            return ad;
          }
        });
      },
      setAd: (state, action) => {
        state.ad = action.payload;
      },
      setAds: (state, action: any) => {
        state.ads = action.payload;
      },
    },
  });

  export const {addAd, deleteAd, updateAd, setAd, setAds} = adSlice.actions;
  export default adSlice.reducer;