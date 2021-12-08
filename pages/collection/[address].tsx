import { useRouter } from "next/dist/client/router"
import type { NextPage } from 'next'
import Collection from "../../components/Collection"

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div>
      {router.isReady && (<Collection address={address} />)}
    </div>
  )
}

export default CollectionPage;