import { useRouter } from "next/dist/client/router"
import type { NextPage } from 'next'
import Collection from "../../components/Collection"
import Head from "next/dist/shared/lib/head"

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div>
      <Head>
        <title>DataBeasts</title>
        <meta name="description" content="DataBeast Collection" />
      </Head>

      {router.isReady && (<Collection address={address} />)}
    </div>
  )
}

export default CollectionPage;