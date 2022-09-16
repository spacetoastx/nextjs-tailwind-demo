import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Hero } from "../components/Hero";
import { BasicLayout } from "../layouts/BasicLayout";

const Home: NextPage = () => (
  <BasicLayout>
    <Hero />
    <p>HI :) Had hier geen tijd voor haha</p>
  </BasicLayout>
);

export default Home;
