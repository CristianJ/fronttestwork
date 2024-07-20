export async function getServerSideProps(context) {
    return {
      redirect: {
        destination: '/SearchMovie',
        permanent: false,
      },
    };
  }
  
  export default function SearchPage() {
    return null; 
  }