'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
export default function Load(){
    return (
        <>
              <ProgressBar
          height="4px"
          color="blue"
          options={{ showSpinner: true }}
          shallowRouting
        />
        </>
    )
}