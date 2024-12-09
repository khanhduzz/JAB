import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

  const loggedIn : User = {
    firstName: 'You', 
    lastName: 'Tube', 
    email: 'youtube@gmail.com',
    $id: '',
    userId: '',
    dwollaCustomerUrl: '',
    dwollaCustomerId: '',
    name: '',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    dateOfBirth: '',
    ssn: ''
  }

  const mockBanks: (Bank & Account)[] = [
    {
      $id: "bank_001",
      accountId: "acc_001",
      bankId: "bank1",
      accessToken: "abc123",
      fundingSourceUrl: "https://example.com/funding-source",
      userId: "user_123",
      shareableId: "share_001",
      id: "acc_001",
      availableBalance: 1000.0,
      currentBalance: 1200.0,
      officialName: "Example Bank Savings",
      mask: "1234",
      institutionId: "inst_001",
      name: "Savings Account",
      type: "savings",
      subtype: "personal",
      appwriteItemId: "item_001",
    },
    {
      $id: "bank_002",
      accountId: "acc_002",
      bankId: "bank2",
      accessToken: "def456",
      fundingSourceUrl: "https://example.com/funding-source",
      userId: "user_123",
      shareableId: "share_002",
      id: "acc_002",
      availableBalance: 200.0,
      currentBalance: 250.0,
      officialName: "Example Bank Checking",
      mask: "5678",
      institutionId: "inst_002",
      name: "Checking Account",
      type: "checking",
      subtype: "personal",
      appwriteItemId: "item_002",
    },
  ];

  return (
    <>
      <section className='home'>
        <div className="home-content">
          <header className='home-header'>
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || 'Guest'}
              subtext="Just a subtext"
            />

            <TotalBalanceBox
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250.35}
            />
          </header>

        </div>
        <RightSideBar
          user={loggedIn}
          transactions={[]}
          banks={mockBanks}
        />
      </section>
    </>
  )
}

export default Home