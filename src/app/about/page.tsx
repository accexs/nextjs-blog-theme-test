import Link from 'next/link'

const AboutPage = () => {
    return (
        <div>
            <h2 className='mx-20 mt-8 self-start text-2xl font-semibold text-dark'>
                Have a project in mind? Reach out to me 📞 from{' '}
                <Link className='!underline' href={'/contact'}>
                    here
                </Link>{' '}
                and let&apos;s make it happen.
            </h2>
        </div>
    )
}

export default AboutPage
