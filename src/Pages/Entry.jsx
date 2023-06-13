import React from "react";
import Posts from "../Components/Posts";
import { useParams } from "react-router-dom";
import OtherNav from "../Components/OtherNav";
import Dvd1 from "../Posts/Dvd1";
import Dvd2 from "../Posts/Dvd2";
import Dvd3 from "../Posts/Dvd3";
import Dvd4 from "../Posts/Dvd4";

export default function Entry() {
    const { id } = useParams();

    if (id === "damn-vulnerable-defi-solutions-1-unstoppable") {
        return (
            <>
                <Dvd1 />
                <OtherNav />
            </>
        );
    } else if (id === "damn-vulnerable-defi-solutions-2-naive-receiver") {
        return (
            <>
                <Dvd2 />
                <OtherNav />
            </>
        );
    } else if (id === "damn-vulnerable-defi-solutions-3-truster") {
        return (
            <>
                <Dvd3 />
                <OtherNav />
            </>
        );
    } else if (id === "damn-vulnerable-defi-solutions-4-side-entrance") {
        return (
            <>
                <Dvd4 />
                <OtherNav />
            </>
        );
    } else if (id === "damn-vulnerable-defi-solutions-3-truster") {
        return <Dvd3 />;
    } else if (id === "damn-vulnerable-defi-solutions-3-truster") {
        return <Dvd3 />;
    } else if (id === "damn-vulnerable-defi-solutions-3-truster") {
        return <Dvd3 />;
    }
}
