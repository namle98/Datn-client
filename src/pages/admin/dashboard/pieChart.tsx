import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getAllProducts } from "../../../service/product.service";
import { getSubCategories } from "../../../service/subCategory.service";
import { getCategories } from "../../../service/category.service";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allCategory, setAllCategory] = useState<any>([]);
  const [allSubCategory, setAllSubCategory] = useState<any>([]);

  useEffect(() => {
    getAllProducts().then((res) => setAllProducts(res.data));
    getSubCategories().then((res) => setAllSubCategory(res.data));
    getCategories().then((res) => setAllCategory(res.data));
  }, []);

  const numberBrandSold = (brand: string) => {
    const productBrand = allProducts.filter((p: any) => p.brand === brand);
    const brandSold = productBrand
      .map((p: any) => p.sold)
      .reduce((a: any, b: any) => a + b, 0);
    return brandSold;
  };
  const numberCategorySold = (category: string) => {
    const productCategory = allProducts.filter(
      (p: any) => p.category?.name === category
    );
    const categorySold = productCategory
      .map((p: any) => p.sold)
      .reduce((a: any, b: any) => a + b, 0);
    return categorySold;
  };
  const numberSubSold = (sub: string) => {
    const productBrand = allProducts.filter((p: any) =>
      p.subs
        ?.map((s: any) => {
          return s?.name;
        })
        .includes(sub)
    );
    const subSold = productBrand
      .map((p: any) => p.sold)
      .reduce((a: any, b: any) => a + b, 0);
    return subSold;
  };

  const dataBrand = {
    labels: ["Apple", "Dell", "LG", "Asus", "Lenovo"],
    datasets: [
      {
        label: "Amount sold",
        data: [
          numberBrandSold("Apple"),
          numberBrandSold("Dell"),
          numberBrandSold("LG"),
          numberBrandSold("Asus"),
          numberBrandSold("Lenovo"),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(139 136 120)",
          "rgba(139 131 134)",
          "rgba(106 90 205)",
          "rgba(100 149 237)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(139 136 120)",
          "rgba(139 131 134)",
          "rgba(106 90 205)",
          "rgba(100 149 237)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataCategory = {
    labels: allCategory?.map((c: any) => {
      return c?.name;
    }),
    datasets: [
      {
        label: "Amount sold",
        data: allCategory?.map((c: any) => {
          return numberCategorySold(c?.name);
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(139 136 120)",
          "rgba(139 131 134)",
          "rgba(106 90 205)",
          "rgba(100 149 237)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(139 136 120)",
          "rgba(139 131 134)",
          "rgba(106 90 205)",
          "rgba(100 149 237)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataSub = {
    labels: allSubCategory.map((s: any) => {
      return s?.name;
    }),
    datasets: [
      {
        label: "Amount sold",
        data: allSubCategory.map((s: any) => {
          return numberSubSold(s?.name);
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(139 136 120)",
          "rgba(139 131 134)",
          "rgba(106 90 205)",
          "rgba(100 149 237)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(139 136 120)",
          "rgba(139 131 134)",
          "rgba(106 90 205)",
          "rgba(100 149 237)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="container-pie-chart">
        <div>Quantity sold by brand</div>
        <Pie
          className="text-center"
          data={dataBrand}
          options={{
            responsive: true,
            plugins: {
              title: {
                text: "Quantity sold by brand",
              },
            },
          }}
        />
      </div>
      <div className="container-pie-chart">
        <div>Quantity sold by category</div>
        <Pie
          className="text-center"
          data={dataCategory}
          options={{
            responsive: true,
            plugins: {
              title: {
                text: "Quantity sold by brand",
              },
            },
          }}
        />
      </div>
      <div className="container-pie-chart">
        <div>Quantity sold by sub category</div>
        <Pie
          className="text-center"
          data={dataSub}
          options={{
            responsive: true,
            plugins: {
              title: {
                text: "Quantity sold by brand",
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default PieChart;
