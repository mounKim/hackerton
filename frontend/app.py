import streamlit as st
from tkinter.tix import COLUMN
import requests
import json

st.set_page_config(layout="wide")

def icon_button(icon):
    return f'<i class="material-icons">info_outline</i>'

col1, col2, col3 = st.columns(3)

st.title("dcinside")

