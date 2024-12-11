import 'package:flutter/material.dart';

class CustomTextFormField extends StatelessWidget {
  final String label;
  final String? suffixText;
  final int? maxLines;
  final TextInputType? keyboardType;
  final FormFieldSetter<String>? onSaved;
  final FormFieldValidator<String>? validator;

  const CustomTextFormField({
    Key? key,
    required this.label,
    this.suffixText,
    this.maxLines,
    this.keyboardType,
    this.onSaved,
    this.validator,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      maxLines: maxLines ?? 1,
      keyboardType: keyboardType,
      decoration: InputDecoration(
        labelText: label,
        suffixText: suffixText,
        border: OutlineInputBorder(),
      ),
      onSaved: onSaved,
      validator: validator,
    );
  }
}