// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;
use alloc::vec::Vec;
use stylus_sdk::prelude::*;
use alloy_primitives::{aliases::B256, Address};
/// Use an efficient WASM allocator.
#[global_allocator]
static ALLOC: mini_alloc::MiniAlloc = mini_alloc::MiniAlloc::INIT;


sol_storage! {
    #[entrypoint] 
    pub struct ENSRegistry {
        mapping(address => bytes32) address_to_ens;
        mapping(bytes32 => address) ens_to_address;
    }
}

impl ENSRegistry {

}

#[external]
impl ENSRegistry {

    #[view]
    pub fn get_ens_by_address(&self, wallet: Address) -> Result<B256, Vec<u8>> {
        Ok(self.address_to_ens.get(wallet))
    }

    #[view]
    pub fn get_address_by_ens(&self, ens: B256) -> Result<Address, Vec<u8>> {
        Ok(self.ens_to_address.get(ens))
    }

    /// Sets the ENS name associated with the provided wallet address.
    pub fn set_ens_for_address(&mut self, wallet: Address, ens_name: B256) -> Result<(), Vec<u8>> {
        let mut wallet = self.address_to_ens.setter(wallet);
        wallet.set(ens_name);
        Ok(())
    }

    /// Sets the wallet address associated with the provided ENS name.
    pub fn set_address_for_ens(&mut self, wallet: Address, ens_name: B256) -> Result<(), Vec<u8>> {
        let mut ens = self.ens_to_address.setter(ens_name);
        ens.set(wallet);
        Ok(())
    }
}





