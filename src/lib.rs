use std::f64::consts::PI;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(start)]
fn main() -> Result<(), JsValue> {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    let canvas = document.create_element("canvas")?;
    canvas.set_id("canvas");
    body.append_child(&canvas)?;

    Ok(())
}

#[wasm_bindgen]
pub fn get_earth_time(t: i32) -> f64 {
    let seconds = t / 1000 % 60;
    let milliseconds = t % 1000;

    (2.0 * PI / 60.0) * seconds as f64 + (2.0 * PI / 60_000.0) * milliseconds as f64
}

#[wasm_bindgen]
pub fn get_moon_time(t: i32) -> f64 {
    let seconds = t / 1000 % 60;
    let milliseconds = t % 1000;

    (2.0 * PI / 6.0) * seconds as f64 + (2.0 * PI / 6_000.0) * milliseconds as f64
}
