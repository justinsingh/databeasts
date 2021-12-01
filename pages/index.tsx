import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/Button'
import Collection from '../components/Collection'
import { useDataBeastsContext } from '../context/DataBeastsContext'
import styles from '../styles/Home.module.css'
import titleImage from '../public/databeasts_title_transparent.png'

const Home: NextPage = () => {
  const { userAddress, syncWallet, desyncWallet } = useDataBeastsContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>DataBeasts</title>
        <meta name="description" content="Interact With Your DataBeasts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.titleImage}>
          <Image src={titleImage} alt="DataBeasts Title Image" />
        </div>
        <div className={styles.description}>
          {typeof userAddress !== 'undefined' && (
            <div> 
              <Collection />
              <Button text="Desync" onClick={desyncWallet} />
            </div>
          )}
          {typeof userAddress === 'undefined' && <Button text="Sync" onClick={syncWallet} sync={true} />}
        </div>
      </main>
    </div>
  )
}

export default Home