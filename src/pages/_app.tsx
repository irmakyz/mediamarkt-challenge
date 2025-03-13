import React from "react";
import GlobalStyles from "@/styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/services/apollo-client";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import Layout from "@/components/layout/Layout";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
