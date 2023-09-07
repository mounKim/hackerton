import streamlit as st
import pandas as pd
import os

# Function to save user data to a CSV file
def save_to_csv(username, email, password):
    if os.path.exists('members.csv'):
        df = pd.read_csv('members.csv')
        new_row = {'Username': username, 'Email': email, 'Password': password}
        df = df.append(new_row, ignore_index=True)
    else:
        df = pd.DataFrame({'Username': [username], 'Email': [email], 'Password': [password]})
    df.to_csv('members.csv', index=False)

# Title
st.title('Member Registration')

# Collect user inputs
username = st.text_input('Enter Username')
email = st.text_input('Enter Email', type='email')
password = st.text_input('Enter Password', type='password')
confirm_password = st.text_input('Confirm Password', type='password')

# Submit button to save the data
if st.button('Submit'):
    if password == confirm_password:
        save_to_csv(username, email, password)
        st.success('Successfully registered.')
    else:
        st.error('Passwords do not match.')

# View registered members (This is just for demonstration and should not be in a real application)
if st.button('View Registered Members'):
    if os.path.exists('members.csv'):
        df = pd.read_csv('members.csv')
        st.write(df)
    else:
        st.write('No members registered yet.')
