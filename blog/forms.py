from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Post

class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'class': 'form-control form-control-modern', 'placeholder': 'Email'}))

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'form-control form-control-modern', 'placeholder': 'Username'})
        self.fields['password1'].widget.attrs.update({'class': 'form-control form-control-modern', 'placeholder': 'Password'})
        self.fields['password2'].widget.attrs.update({'class': 'form-control form-control-modern', 'placeholder': 'Confirm Password'})

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'image', 'category']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control form-control-modern', 'placeholder': 'Post title'}),
            'content': forms.Textarea(attrs={'class': 'form-control form-control-modern', 'placeholder': 'Write your post content here...', 'rows': 6}),
            'category': forms.Select(attrs={'class': 'form-select form-control-modern'}),
        }
