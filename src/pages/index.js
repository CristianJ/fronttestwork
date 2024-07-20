export async function getServerSideProps(context) {
    return {
      redirect: {
        destination: '/searchMovie',
        permanent: false,
      },
    };
  }
  
  export default function SearchPage() {
    return null; 
  }