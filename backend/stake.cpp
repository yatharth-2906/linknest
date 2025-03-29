#include <iostream>

using namespace std;

int main()
{
    int investment1, investment2;
    int outcome1, outcome2;
    
    cout<<"Welcome To Satta Split App: "<<endl;
    
    cout<<"\n\n";
    cout<<"Enter Details for User 1:"<<endl;
    cout<<"Investment for User 1:";
    cin>>investment1;
    cout<<"Outcome for User 1:";
    cin>>outcome1;
    
    cout<<"\n\n";
    cout<<"Enter Details for User 2:"<<endl;
    cout<<"Investment for User 2:";
    cin>>investment2;
    cout<<"Outcome for User 2:";
    cin>>outcome2;
    
    int profit = (outcome1 + outcome2) - (investment1 + investment2);
    int indivisual_porfit = profit/2;
    
    cout<<"\n\n";
    cout<<"Indivisual Profit: "<<indivisual_porfit<<endl;
    if(investment1+indivisual_porfit-outcome1 > 0)
        cout<<"User1 will receive "<<investment1+indivisual_porfit-outcome1<<" from User2."<<endl;
    else
        cout<<"User2 will receive "<<investment2+indivisual_porfit-outcome2<<" from User1."<<endl;
}