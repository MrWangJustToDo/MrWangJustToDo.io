// NOTE: this folder just for server side code, because some module can only import by server, so client bundle will skip server code

export { generateGetServerSideProps, generateGetStaticProps } from "./serverSideRequest";
export { serverSideTranslations } from "./serverSideTranslations";
