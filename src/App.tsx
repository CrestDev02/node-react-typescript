import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./config/route";
import { Context } from "./utils/context";

export const App: FC = () => {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
    </div>
  );
};
