import React from "react";
import Posts from "../Components/Posts";
import { useParams } from "react-router-dom";
import Dvd1 from "../Posts/Dvd1";
import Dvd2 from "../Posts/Dvd2";
import Dvd3 from "../Posts/Dvd3";

export default function Entry() {
    const { id } = useParams();

    if (id === "damn-vulnerable-defi-solutions-1-unstoppable") {
        return <Dvd1 />;
    } else if (id === "damn-vulnerable-defi-solutions-2-naive-receiver") {
        return <Dvd2 />;
    } else if (id === "damn-vulnerable-defi-solutions-3-truster") {
        return <Dvd3 />;
    }
}
